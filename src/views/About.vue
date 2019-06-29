<template>
  <v-list>
    <v-list-tile v-for="item in items" :key="item.title">
      <v-list-tile-avatar>
        <v-icon>{{item.icon}}</v-icon>
      </v-list-tile-avatar>
      <v-list-tile-content>
        <v-list-tile-title>{{item.title}}</v-list-tile-title>
        <!-- <v-list-tile-sub-title>bbbbb</v-list-tile-sub-title> -->
      </v-list-tile-content>
      <!-- <v-list-tile-action>
        <v-btn icon ripple>
          <v-icon color="grey lighten-1">mdi-alert-box</v-icon>
        </v-btn>
      </v-list-tile-action> -->

    </v-list-tile>

  </v-list>
</template>
<script>
export default {
  data () {
    return {
      items: [
        {
          icon: 'mdi-alert',
          title: 'home'
        },
        {
          icon: 'mdi-alert-box',
          title: 'About2'
        },
        {
          icon: 'mdi-alert-circle',
          title: 'About'
        }
      ]
    }
  }
}
</script>
