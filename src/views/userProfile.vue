<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="light-blue" dark dense flat>
        <v-toolbar-title>회원 정보</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon :disabled="!valid" @click="changeName">
          <v-icon>mdi-content-save</v-icon>
        </v-btn>
      </v-toolbar>
      <v-alert type="error" border="left" v-if="!_.get(this.$store.state.user, 'emailVerified', null)">이메일을 확인해주세요</v-alert>
      <v-card-text>
        <v-row>
          <v-col cols="12" sm="5">
            <v-img v-if="_.get($store.state.user, 'photoURL', null)" :src="this.$store.state.user.photoURL"></v-img>
            <template v-else>
              <v-row align="center" justify="center">
                <v-avatar
                  size="200"
                  color="indigo"
                >
                  <v-img :src="require('@/assets/images/account-alert.png')" alt="avatar"></v-img>
                </v-avatar>
              </v-row>
            </template>
          </v-col>
          <v-col cols="12" sm="7">
            <v-form v-model="valid" ref="form" lazy-validation>
              <v-row>
                <v-col cols="12">
                  <span class="title">계정 유형: {{levels[_.get($store.state.claims, 'level', 2)]}}</span>
                </v-col>
                <v-col cols="12">
                  <v-alert type="warning" border="left" v-if="_.get($store.state.claims, 'level', 2) > 1">
                    페이지 접근을 위해 관리자에게 승인 요청을 하시기 바랍니다.
                  </v-alert>
                </v-col>
                <v-col cols="12">
                  <v-file-input
                    v-model="file"
                    label="사진 변경"
                    prepend-icon="mdi-camera"
                    @change="upload"
                    outlined
                  ></v-file-input>

                  <v-progress-linear v-if="progress > 0 && progress < 100" :value="progress"></v-progress-linear>
                </v-col>
                <v-col cols="4">
                  <v-text-field
                    label="성"
                    v-model="form.lastName"
                    :rules="[rule.required, rule.minLength(1), rule.maxLength(10)]"
                    outlined
                  ></v-text-field>
                </v-col>
                <v-col cols="8">
                  <v-text-field
                    label="이름"
                    v-model="form.firstName"
                    :rules="[rule.required, rule.minLength(1), rule.maxLength(20)]"
                    required
                    outlined
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </v-col>

        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
import { readAndCompressImage } from 'browser-image-resizer'

export default {
  data () {
    return {
      file: null,
      loading: false,
      form: {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
      },
      rule: {
        required: v => !!v || '필수 항목입니다.',
        minLength: length => v => v.length >= length || `${length}자리 이상으로 입력하세요.`,
        maxLength: length => v => v.length <= length || `${length}자리 이하으로 입력하세요.`
      },
      valid: false,
      progress: 0,
      levels: ['관리자', '사용자', '손님']
    }
  },
  async created () {
    if (this.$store.state.claims.level === undefined) await this.tokenUpdate()
    const ns = this.$store.state.user.displayName.split(' ')
    if (ns.length === 1) this.form.lastName = ns[0]
    else if (ns.length === 2) {
      this.form.firstName = ns[1]
      this.form.lastName = ns[0]
    }
  },
  methods: {
    async tokenUpdate () {
      const user = this.$firebase.auth().currentUser
      await user.getIdToken(true)
      await this.$store.dispatch('getUser', user)
    },
    async upload () {
      const r = await this.$swal.fire({
        title: '정말 변경하시겠습니까?',
        type: 'warning',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        showCancelButton: true
      })
      if (!r.value) {
        this.file = null
        return
      }
      const storageRef = this.$firebase.storage().ref()
      this.loading = true
      const user = this.$firebase.auth().currentUser
      // const uploadTask = storageRef.child(user.uid).put(this.files)

      const config = {
        quality: 0.5,
        maxWidth: 500,
        maxHeight: 500,
        autoRotate: true
      }
      const resizedImage = await readAndCompressImage(this.file, config)
      // var metadata = {
      //   contentType: 'image/jpeg',
      // }
      const uploadTask = storageRef.child(user.uid).put(resizedImage)

      uploadTask.on(this.$firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          this.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          switch (snapshot.state) {
            case this.$firebase.storage.TaskState.PAUSED: // or 'paused'
              this.$toasted.global.error('Upload is paused')
              break
            case this.$firebase.storage.TaskState.RUNNING: // or 'running'
              // this.$toasted.global.notice('Upload is running')
              break
          }
        }, (error) => {
          this.$toasted.global.error(error.code)
          this.loading = false
        }, () => {
          uploadTask.snapshot.ref.getDownloadURL().then(async (photoURL) => {
            const updatedAt = new Date()
            await user.updateProfile({ updatedAt, photoURL })
            await this.$firebase.firestore().collection('users').doc(user.uid).update({ updatedAt, photoURL })
            this.loading = false
          })
        })
    },
    async changeName () {
      if (!this.$refs.form.validate()) return this.$toasted.global.error('입력 폼을 올바르게 작성해주세요.')
      const r = await this.$swal.fire({
        title: '정말 변경하시겠습니까?',
        type: 'warning',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        showCancelButton: true
      })
      if (!r.value) return
      const user = this.$firebase.auth().currentUser
      const updatedAt = new Date()
      const displayName = `${this.form.lastName} ${this.form.firstName}`
      await user.updateProfile({ updatedAt, displayName })
      await this.$firebase.firestore().collection('users').doc(user.uid).update({ updatedAt, displayName })
      location.reload()
    }
  }
}
</script>
