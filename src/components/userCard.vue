<template>
  <v-card :loading="loading">
    <v-list-item three-line>
      <v-list-item-avatar
        size="125"
        tile
      >
        <v-img :src="item.photoURL | imgCheck"></v-img>
      </v-list-item-avatar>

      <v-list-item-content class="align-self-start">
        <v-list-item-title
          class="headline mb-2"
          v-text="item.email"
        ></v-list-item-title>

        <!-- <v-list-item-subtitle v-text="item.displayName | nameCheck"></v-list-item-subtitle> -->
        <v-list-item-subtitle>{{item.displayName | nameCheck}}</v-list-item-subtitle>
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
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="del" color="error">삭제</v-btn>
    </v-card-actions>
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
      return 'https://cdn.vuetifyjs.com/images/cards/foster.jpg'
    }
  },
  methods: {
    levelChange (v) {
      this.loading = true
      this.$axios.patch(`/admin/user/${v.uid}/level`, { level: v.level })
        .catch(e => {
          this.$toasted.global.error(e.message)
        })
        .finally(() => {
          this.loading = false
        })
    },
    async del () {
      await this.$axios.delete(`/admin/user/${this.item.uid}`)
      this.$emit('del')
    }
  }
}
</script>
