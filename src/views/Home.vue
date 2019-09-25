<template>
  <v-container fluid>
    <v-card>
      <v-toolbar color="light-blue" dark dense flat>
        <v-toolbar-title>메인</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-alert type="warning" border="left">
          공사중입니다.
        </v-alert>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data () {
    return {
    }
  }
}
</script>
