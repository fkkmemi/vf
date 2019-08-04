<template>
  <v-card>
    <v-card-title primary-title>
      사용자 관리
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="items"
        :options.sync="options"
        :server-items-length="totalCount"
        :loading="loading"
        class="elevation-1"
      ></v-data-table>
      </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="list">get list</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        {
          text: 'uid',
          sortable: false,
          value: 'uid'
        },
        // uid, email, displayName, emailVerified, photoURL, disabled, level
        { text: 'email', value: 'email' },
        { text: 'displayName', value: 'displayName' },
        { text: 'photoURL', value: 'photoURL' },
        { text: 'level', value: 'level' }
      ],
      items: [],
      totalCount: 0,
      loading: false,
      options: {}
    }
  },
  methods: {
    async list () {
      const r = await this.$axios.get('/admin/users')
      console.log(r)
      this.totalCount = r.data.totalCount
      this.items = r.data.items
    }
  }
}
</script>

<style>

</style>
