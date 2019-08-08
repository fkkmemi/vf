<template>
  <v-card>
    <v-card-title primary-title>
      <!-- 사용자 관리 -->
      {{search}}
      <v-combobox
        v-model="search"
        :items="emails"
        label="이메일을 입력하세요"
        :loading="loadingSearch"
        @update:search-input="searchEmails"
      ></v-combobox>
    </v-card-title>
    <v-card-text>
      <v-data-table
        :headers="headers"
        :items="items"
        :options.sync="options"
        :server-items-length="totalCount"
        :items-per-page="5"
        :loading="loading"
        must-sort
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
import _ from 'lodash'
export default {
  data () {
    return {
      headers: [
        {
          text: 'uid',
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
      options: {
        sortBy: ['email'],
        sortDesc: [false]
      },
      search: '',
      emails: [],
      loadingSearch: false
    }
  },
  watch: {
    options: {
      handler () {
        this.list()
      },
      deep: true
    }
  },
  methods: {
    async list () {
      this.loading = true
      const r = await this.$axios.get('/admin/users', {
        params: {
          offset: this.options.page > 0 ? (this.options.page - 1) * this.options.itemsPerPage : 0,
          limit: this.options.itemsPerPage,
          order: this.options.sortBy[0],
          sort: this.options.sortDesc[0] ? 'desc' : 'asc',
          search: this.search
        }
      })
      this.totalCount = r.data.totalCount
      this.items = r.data.items
      this.loading = false
      console.log(this.options)
    },
    // async searchEmails () {
    //   this.loadingSearch = true
    //   const { data } = await this.$axios.get('/admin/search')
    //   this.emails = data
    //   this.loadingSearch = false
    // },
    searchEmails: _.debounce(
      function () {
        this.loadingSearch = true

        this.$axios.get('/admin/search')
          .then(({ data }) => {
            this.emails = data
            console.log(this.emails)
            this.loadingSearch = false
            this.list()
          })
      },
      // 사용자가 입력을 기다리는 시간(밀리세컨드) 입니다.
      500
    )
  }
}
</script>

<style>

</style>
