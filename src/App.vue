<script lang="ts">
import Vue from 'vue';
import {mapGetters} from "vuex";
import Home from '@/views/Home.vue'

export default Vue.extend({
  name: 'App',
  // components: {Home},
  data: () => ({
    menuItems: [
      {
        title: 'Profile',
        icon: 'mdi-account',
        path: '/profile'
      },
    ],
  }),
  methods: {
    logout() {
      this.$store.dispatch('auth/logout').then(() => {
        if (this.$route.path !== '/home') {
          this.$router.replace('/')
        }
      })
    },
    navigateLogin() {
      if (this.$route.path !== '/login') {
        this.$router.replace('/login')
      }
    }
  },
  computed: {
    ...mapGetters('auth', [
      'loggedIn'
    ]),
    ...mapGetters('info', [
      'visible',
      'invisible'
    ]),
  },
  async beforeCreate() {
    await this.$store.dispatch('auth/checkAndRevokeToken')
    this.$store.dispatch('info/fetch')
  }
});
</script>

<style scoped type="scss">
.main-title-btn {
  background: inherit !important;
  border: none !important;
  box-shadow: none !important;
}

.theme--dark.v-btn--active::before {
  opacity: 0 !important;
}
</style>

<template>
  <v-app>
    <v-app-bar
        app
        color="primary"
        dark
    >
      <div class="d-flex align-center">
        <v-btn to="/" class="main-title-btn">
          <h3>
            <v-icon>mdi-head-question-outline</v-icon>
            QA Site
          </h3>
        </v-btn>
      </div>

      <v-spacer></v-spacer>

      <v-menu
          bottom
          left
          v-if="visible || (invisible && loggedIn) "
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
          <template v-if="loggedIn">
            <v-list-item
                v-for="(item, i) in menuItems"
                :key="i"
                link
                :to="item.path"
            >
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-list-item
              v-if="!loggedIn"
              @click="navigateLogin()"
              link
          >
            <v-list-item-icon>
              <v-icon v-text="'mdi-logout'"></v-icon>
            </v-list-item-icon>
            <v-list-item-content v-text="'Login'"></v-list-item-content>
          </v-list-item>
          <v-list-item
              v-if="loggedIn"
              @click="logout()"
              link
          >
            <v-list-item-icon>
              <v-icon v-text="'mdi-logout'"></v-icon>
            </v-list-item-icon>
            <v-list-item-content v-text="'Logout'"></v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>
