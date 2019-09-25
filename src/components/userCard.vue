<template>
  <v-card :loading="loading">
    <v-toolbar color="transparent" dense flat>
      <v-toolbar-title>{{ item.email }}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon @click="del" color="error">
        <v-icon>mdi-delete</v-icon>
      </v-btn>
    </v-toolbar>
    <v-divider></v-divider>
    <v-list-item three-line>
      <v-list-item-avatar
        size="125"
        tile
      >
        <v-img :src="item.photoURL | imgCheck"></v-img>
      </v-list-item-avatar>

      <v-list-item-content class="align-self-start">
        <v-list-item-title
          class="title mb-2"
        >{{item.displayName | nameCheck}}</v-list-item-title>

        <v-list-item-subtitle>
          <v-select
            class="ma-2"
            v-model="item.level"
            :items="levels"
            @change="levelChange(item)"
            solo
            hide-details
          ></v-select>
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>
<script>
export default {
  props: ['item'],
  data () {
    return {
      loading: false,
      levels: [
        { value: 0, text: '관리자' },
        { value: 1, text: '일반사용자' },
        { value: 2, text: '손님' }
      ]
    }
  },
  filters: {
    nameCheck: function (v) {
      if (v) return v
      return 'no name'
    },
    imgCheck (v) {
      if (v) return v
      return require('@/assets/images/account.png')
    }
  },
  methods: {
    async levelChange (v) {
      const r = await this.$swal.fire({
        title: '정말 변경하시겠습니까?',
        text: '변경 후 되돌릴 수 없습니다.',
        type: 'warning',
        confirmButtonText: '확인',
        cancelButtonText: '취소',
        showCancelButton: true
      })
      if (!r.value) return
      this.loading = true
      try {
        await this.$axios.patch(`/admin/user/${v.uid}/level`, { level: v.level })
      } catch (e) {
        this.$toasted.global.error(e.message)
      } finally {
        this.loading = false
      }
    },
    async del () {
      const r = await this.$swal.fire({
        title: '정말 삭제하시겠습니까?',
        text: '삭제 후 되돌릴 수 없습니다.',
        type: 'error',
        // confirmButtonText: 'Cool',
        showCancelButton: true
      })
      if (!r.value) return
      this.loading = true
      try {
        await this.$axios.delete(`/admin/user/${this.item.uid}`)
        this.$emit('del')
      } catch (e) {
        this.$toasted.global.error(e.message)
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
