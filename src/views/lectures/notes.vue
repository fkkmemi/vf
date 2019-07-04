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
            <v-card-text>
              {{ props.item.id }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn @click="put(props.item.id)">put</v-btn>
              <v-btn @click="del(props.item.id)">del</v-btn>
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
    this.get()
  },
  methods: {
    async post () {
      // this.items.push({
      //   title: this.title, content: this.content
      // })
      const r = await this.$firebase.firestore().collection('notes').add({
        title: this.title, content: this.content
      })
      console.log(r)
      this.title = ''
      this.content = ''
      await this.get()
    },
    async get () {
      const snapshot = await this.$firebase.firestore().collection('notes').get()
      this.items = []
      snapshot.forEach(v => {
        const { title, content } = v.data()
        this.items.push({
          title, content, id: v.id
        })
      })
      console.log(snapshot)
    },
    async put (id) {
      const r = await this.$firebase.firestore().collection('notes').doc(id).set({
        title: this.title, content: this.content
      })
      await this.get()
      console.log(r)
    },
    async del (id) {
      const r = await this.$firebase.firestore().collection('notes').doc(id).delete()
      await this.get()
      console.log(r)
    }
  }
}
</script>
