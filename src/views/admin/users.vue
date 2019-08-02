<template>
  <v-card>
    <v-card-title primary-title>
      사용자 관리
    </v-card-title>
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

    }
  },
  methods: {
    async list () {
      const r = await this.$axios.get('/admin/users')
      console.log(r)
    }
  }
}
</script>

<style>

</style>
