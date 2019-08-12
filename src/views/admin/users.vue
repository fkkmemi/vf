<template>
  <v-container grid-list-md>
    <v-card>
      <v-toolbar
        dark
        color="teal"
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
      </v-toolbar>
      <v-container grid-list-md fluid>
        <v-data-iterator
          :items="items"
          :options.sync="options"
          :server-items-length="totalCount"
          :items-per-page="4"
          :loading="loading"
        >
          <template v-slot:default="props">
            <v-layout row wrap>
              <v-flex xs12 v-if="loading" class="text-center">
                <v-progress-circular indeterminate></v-progress-circular>
                <p>데이터 로딩중</p>

              </v-flex>
              <v-flex
                v-else
                v-for="item in props.items"
                :key="item.email"
                xs12
                sm6
                md4
                lg3
              >
                <v-card>
                  <!-- <v-card-title><h4>{{ item.displayName }}</h4></v-card-title>
                  <v-divider></v-divider>
                  <v-list dense>
                    <v-list-item>
                      <v-list-item-content>e:</v-list-item-content>
                      <v-list-item-content class="align-end">{{ item.email }}</v-list-item-content>
                    </v-list-item>
                  </v-list> -->
                  <!-- <v-card-title>
                    {{item.email}}
                  </v-card-title>
                  <v-divider></v-divider> -->
                  <v-list-item three-line>
                    <v-list-item-avatar
                      size="125"
                      tile
                      rounded
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
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-flex>
            </v-layout>
          </template>

        </v-data-iterator>
      </v-container>
    </v-card>
  </v-container>
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
    async list () {
      this.loading = true
      const r = await this.$axios.get('/admin/users', {
        params: {
          offset: this.options.page > 0 ? (this.options.page - 1) * this.options.itemsPerPage : 0,
          limit: this.options.itemsPerPage,
          order: this.options.sortBy[0],
          sort: this.options.sortDesc[0] ? 'desc' : 'asc',
          search: this.email
        }
      })
      this.totalCount = r.data.totalCount
      this.items = r.data.items
      this.loading = false
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
