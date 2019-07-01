<template>
  <v-app>
    <v-navigation-drawer v-model="drawer" fixed app>
      <v-toolbar flat color="transparent">
        <v-toolbar-title>Account</v-toolbar-title>
      </v-toolbar>
      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>{{ item.title }}</v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="subItem in item.subItems"
            :key="subItem.title"
            :to="subItem.to"
          >
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon>{{ subItem.icon }}</v-icon>
            </v-list-tile-action>
          </v-list-tile>

        </v-list-group>
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
          active: true,
          subItems: [
            {
              title: 'dashboard',
              to: '/'
            },
            {
              title: 'About2',
              to: '/about2'
            }
          ]
        },
        {
          icon: 'mdi-alert-box',
          title: 'Lectures',
          active: false,
          subItems: [
            {
              title: 'card',
              to: '/lectures/card'
            },
            {
              title: 'layout',
              to: '/lectures/layout'
            }
          ]
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
