<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-toolbar flat color="transparent">
        <v-toolbar-title>Account</v-toolbar-title>
      </v-toolbar>
      <v-divider></v-divider>
      <v-list>
        <v-list-tile v-for="item in items" :key="item.title" :to="item.to">
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
    </v-navigation-drawer>
    <v-toolbar color="lime">
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon>
          <v-icon>mdi-dots-vertical</v-icon>
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data () {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-alert',
          title: 'home',
          to: '/'
        },
        {
          icon: 'mdi-alert-box',
          title: 'About2',
          to: '/about2'
        },
        {
          icon: 'mdi-alert-circle',
          title: 'About',
          to: '/about'
        }
      ]
    }
  },
  methods: {
    test () {

    }
  }
}
</script>
