<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-toolbar color="primary">
          axios eg
        </v-toolbar>
      </v-flex>
      <v-flex xs3>
        <v-card>
          <v-card-title primary-title>
            create
          </v-card-title>
          <v-card-text>
            <v-textarea
              v-model="textCreate"
              rows="10"
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="primary" @click="create">submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card>
          <v-card-title primary-title>
            read
          </v-card-title>
          <v-card-text>
            <v-textarea
              v-model="textRead"
              rows="10"
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="primary" @click="read">submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card>
          <v-card-title primary-title>
            update
          </v-card-title>
          <v-card-text>
            <v-textarea
              v-model="textUpdate"
              rows="10"
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="primary" @click="update">submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
      <v-flex xs3>
        <v-card>
          <v-card-title primary-title>
            delete
          </v-card-title>
          <v-card-text>
            <v-textarea
              v-model="textDelete"
              rows="10"
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="primary" @click="del">submit</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      textCreate: '',
      textRead: '',
      textUpdate: '',
      textDelete: ''
    }
  },
  methods: {
    async create () {
      const r = await this.$axios.post('test')
      this.textCreate = r.data
    },
    read () {
      this.$axios.get('http://localhost:5000/test-vf-2-891b8/us-central1/test/33423')
        .then(r => {
          this.textRead = r.data
        })
        .catch(e => console.error(e.message))
    },
    update () {
      this.$axios.put('http://localhost:5000/test-vf-2-891b8/us-central1/test/12345')
        .then(r => {
          this.textUpdate = r.data
        })
        .catch(e => console.error(e.message))
    },
    del () {
      this.$axios.delete('http://localhost:5000/test-vf-2-891b8/us-central1/test/4443333')
        .then(r => {
          this.textDelete = r.data
        })
        .catch(e => console.error(e.message))
    }
  }
}
</script>
