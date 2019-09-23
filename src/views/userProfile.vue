<template>
  <v-container fluid>
    <v-card>
      <v-alert type="error" v-if="!this.$store.state.user.emailVerified">이메일을 확인해주세요</v-alert>
      <v-card-text>
        <v-row>
          <v-col cols="5">
            <v-img :src="this.$store.state.user.photoURL"></v-img>

          </v-col>
          <v-col cols="7">
            <v-form v-model="valid" ref="form" lazy-validation>

              <v-file-input
                v-model="files"
                label="사진 변경"
                prepend-icon="mdi-camera"
                @change="upload"
              ></v-file-input>
              <v-text-field
                label="성"
                v-model="form.lastName"
                :rules="[rule.required, rule.minLength(1), rule.maxLength(10)]"
                ></v-text-field>
              <v-text-field
                label="이름"
                v-model="form.firstName"
                :rules="[rule.required, rule.minLength(1), rule.maxLength(20)]"
                required
                ></v-text-field>
              <v-btn color="primary" :disabled="!valid" @click="changeName">
                이름 변경
              </v-btn>
            </v-form>
          </v-col>

        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      files: [],
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
      valid: false
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
    upload () {
      console.log(this.files)
      const storageRef = this.$firebase.storage().ref()
      this.loading = true
      const user = this.$firebase.auth().currentUser
      const uploadTask = storageRef.child(user.uid).put(this.files)

      uploadTask.on(this.$firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case this.$firebase.storage.TaskState.PAUSED: // or 'paused'
              console.log('Upload is paused')
              break
            case this.$firebase.storage.TaskState.RUNNING: // or 'running'
              console.log('Upload is running')
              break
          }
        }, (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
            // User doesn't have permission to access the object
              console.error('storage/unauthorized')
              break

            case 'storage/canceled':
            // User canceled the upload
              console.error('storage/canceled')
              break

            case 'storage/unknown':
            // Unknown error occurred, inspect error.serverResponse
              console.error('storage/unknown')
              break
          }
          this.loading = false
        }, () => {
        // Upload completed successfully, now we can get the download URL
          uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
            user.updateProfile({
              photoURL: downloadURL
            })
            console.log('File available at', downloadURL)
            location.reload()
          })
          this.loading = false
        })
    },
    async changeName () {
      if (!this.$refs.form.validate()) return this.$toasted.global.error('입력 폼을 올바르게 작성해주세요.')
      const user = this.$firebase.auth().currentUser
      await user.updateProfile({
        displayName: `${this.form.lastName} ${this.form.firstName}`
      })
      location.reload()
    }
  }
}
</script>
