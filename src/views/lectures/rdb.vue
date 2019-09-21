<template>
  <v-container fluid>
    <v-card>
      <v-subheader>rdb test</v-subheader>
      <v-card-text>
        <v-text-field v-model="input"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="write">write</v-btn>
      </v-card-actions>
      <v-card-text>
        <v-alert type="info">{{value}}</v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>
<script>
export default {
  data () {
    return {
      input: '',
      value: '',
      ref: null
    }
  },
  created () {
    this.read()
  },
  destroyed () {
    this.ref.off()
  },
  methods: {
    write () {
      this.$firebase.database().ref('users/' + this.$store.state.user.uid).set({ feel: this.input })
    },
    read () {
      this.ref = this.$firebase.database().ref('users/')
      this.ref.on('value', d => {
        this.value = d.val()
      })
    }
  }
}
</script>
