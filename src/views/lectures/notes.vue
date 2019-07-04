<template>
  <v-container fluid grid-list-md>
    <v-layout>
      <!-- <v-flex xs12>
        {{ pagination }}
      </v-flex> -->
      <v-flex xs5>
        <v-text-field v-model="title" label="title"></v-text-field>
      </v-flex>
      <v-flex xs5>
        <v-text-field v-model="content" label="content"></v-text-field>
      </v-flex>
      <v-flex xs2>
        <v-btn color="success" @click="post">post</v-btn>
      </v-flex>
    </v-layout>
    <v-data-iterator
      :items="items"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      content-tag="v-layout"
      row
      wrap
    >
      <template v-slot:item="props">
        <v-flex
          xs12
          sm6
          md4
          lg3
        >
          <v-card>
            <v-card-title><h4>{{ props.item.title }}</h4></v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              {{ props.item.content }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="put(props.item)">put</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>
  </v-container>
</template>
<script>
export default {
  data: () => ({
    rowsPerPageItems: [4, 8, 12],
    pagination: {
      rowsPerPage: 4
    },
    items: [],
    title: '',
    content: ''
  }),
  mounted () {
  },
  methods: {
    post () {
      this.items.push({
        title: this.title, content: this.content
      })
      this.title = ''
      this.content = ''
    },
    get () {

    },
    put () {

    },
    del () {

    }
  }
}
</script>
