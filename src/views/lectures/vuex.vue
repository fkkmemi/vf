<template>
  <div>
    <v-btn color="success" @click="set">set</v-btn>
  </div>
</template>
<script>
export default {
  methods: {
    set () {
      this.$store.commit('setTitle', '변했니?')
    }
  }
}
</script>
