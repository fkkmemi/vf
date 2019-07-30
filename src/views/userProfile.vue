<template>
  <div>
    <p>user profile</p>
    {{ JSON.stringify($store.state.claims, null, 2) }}
  </div>
</template>
<script>
export default {
  data () {
    return {

    }
  }
}
</script>
