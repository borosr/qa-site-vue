<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'App',
  data: () => ({
    menuItems: [
      {
        title: 'Profile',
        icon: 'mdi-account',
        path: '/profile'
      },
      {
        title: 'Questions',
        icon: 'mdi-comment-question',
        path: '/questions'
      },
    ],
  }),
  methods: {
    move(path: string) {
      this.$router.push(path)
    }
  }
});
</script>

<style scoped type="scss">
</style>

<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <div class="d-flex align-center" @click="move('/')" style="cursor: pointer">
        <h3>
          <v-icon>mdi-head-question-outline</v-icon>
          QA Site
        </h3>
      </div>

      <v-spacer></v-spacer>

      <v-menu
          bottom
          left
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
              dark
              icon
              v-bind="attrs"
              v-on="on"
          >
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item
              v-for="(item, i) in menuItems"
              :key="i"
              link
          >
            <v-list-item-icon>
              <v-icon v-text="item.icon"></v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title @click="move(item.path)" v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>
