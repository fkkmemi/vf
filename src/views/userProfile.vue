<template>
  <v-container fluid="">
    <v-card>
      <v-alert type="error" v-if="!this.$store.state.user.emailVerified">이메일을 확인해주세요</v-alert>
    </v-card>
    <!-- <p>user profile</p>
    {{ JSON.stringify($store.state.claims, null, 2) }}
    <v-btn color="success" @click="tokenUpdate">tokenUpdate</v-btn> -->
  </v-container>
</template>
<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    async tokenUpdate () {
      const user = this.$firebase.auth().currentUser
      await user.getIdToken(true)
      await this.$store.dispatch('getUser', user)
    }
  }
}
</script>
