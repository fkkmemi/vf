<template>
  <v-container fluid>
    <v-card>
      <v-toolbar
        dark
        color="teal"
        flat
      >
        <v-toolbar-title>회원 관리</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-autocomplete
          v-model="email"
          :loading="loadingSearch"
          :items="emails"
          :search-input.sync="search"
          cache-items
          class="mx-4"
          flat
          hide-no-data
          hide-details
          label="이메일을 입력하세요"
          solo-inverted
          clearable
        ></v-autocomplete>
        <v-btn icon @click="list" :disabled="loading">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>
      </v-toolbar>
      <v-container grid-list-md fluid>
        <v-data-iterator
          :items="items"
          :options.sync="options"
          :server-items-length="totalCount"
          :items-per-page="4"
          :loading="loading"
          :footer-props="{
            showFirstLastPage: true,
            'items-per-page-options':[4, 8, 20],
            'items-per-page-text': ''
          }"
        >
          <template v-slot:loading>
            <v-card color="transparent" flat v-if="loading">
              <v-card-text class="text-center">
                <v-progress-circular
                  indeterminate
                  color="primary"
                ></v-progress-circular>
              </v-card-text>
              <v-card-text class="text-center">
                데이터를 불러오는 중입니다.
              </v-card-text>
            </v-card>
          </template>
          <template v-slot:default="props">
            <v-row>
              <v-col cols="12" v-if="loading" class="text-center">
                <v-card color="transparent" flat v-if="loading">
                  <v-card-text class="text-center">
                    <v-progress-circular
                      indeterminate
                      color="primary"
                    ></v-progress-circular>
                  </v-card-text>
                  <v-card-text class="text-center">
                    데이터를 불러오는 중입니다.
                  </v-card-text>
                </v-card>
              </v-col>
              <v-col
                v-else
                cols="12"
                v-for="item in props.items"
                :key="item.email"
                sm="6"
                md="4"
                lg="3"
              >
                <user-card :item="item" @del="list"></user-card>
              </v-col>
            </v-row>
          </template>
        </v-data-iterator>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
import _ from 'lodash'
import UserCard from '@/components/userCard'

export default {
  components: { UserCard },
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
      email: null,
      loadingSearch: false
    }
  },
  watch: {
    options: {
      handler () {
        this.list()
      },
      deep: true
    },
    search (val) {
      val && val !== this.email && this.searchEmails(val)
    },
    email (n, o) {
      if (n !== o) this.list()
    }
  },
  methods: {
    list () {
      this.loading = true
      this.$axios.get('/admin/users', {
        params: {
          offset: this.options.page > 0 ? (this.options.page - 1) * this.options.itemsPerPage : 0,
          limit: this.options.itemsPerPage,
          order: this.options.sortBy[0],
          sort: this.options.sortDesc[0] ? 'desc' : 'asc',
          search: this.email
        }
      })
        .then(({ data }) => {
          this.totalCount = data.totalCount
          // const items = []
          // data.items.forEach(v => {
          //   v = v.createdAt.toDate()
          //   items.push(v)
          // })
          this.items = data.items
        })
        .catch(e => {
          this.$toasted.global.error(e.message)
        })
        .finally(() => {
          this.loading = false
        })
    },
    searchEmails: _.debounce(
      function (val) {
        this.loadingSearch = true

        this.$axios.get('/admin/search', {
          params: { search: this.search }
        })
          .then(({ data }) => {
            this.emails = data
          })
          .catch(e => {
            this.$toasted.global.error(e.message)
          })
          .finally(() => {
            this.loadingSearch = false
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
