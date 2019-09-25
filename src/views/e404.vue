<template>
  <v-container>
    <v-alert type="error" border="left">
      <h3>찾으시는 페이지({{ $route.path }})가 없습니다.</h3>
      <span class="caption">404 page not found</span>
    </v-alert>
  </v-container>
</template>
