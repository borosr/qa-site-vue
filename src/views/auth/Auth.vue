<script lang="ts">
import Vue from 'vue';
import Login from './Login.vue'
import Signup from "@/views/auth/Signup.vue";

export default Vue.extend({
  name: "Auth",
  components: {Signup, Login},
  data: () => ({
    showing: ''
  }),
  methods: {
    show(comp: string) {
      if (['login', 'signup', ''].indexOf(comp) !== -1) {
        this.showing = comp
      }
    },
    providerEnabled(provider: string): boolean {
      return this.$store.state.info.oauth_providers[provider]
    }
  }
})
</script>

<style scoped>

</style>

<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card
              class="mx-auto"
              max-width="344"
          >
            <Login v-if="showing === 'login'" @back="show('')" />
            <Signup v-else-if="showing === 'signup'"
                    @created="show('login')"
                    @back="show('')"
            />
            <v-card-text v-else>
              <v-layout justify-center>
                <v-btn color="black"
                       @click="showing = 'login'"
                       outlined
                >
                  Continue with Email
                </v-btn>
              </v-layout>
              <v-layout justify-center class="mt-5 mb-5">
                <v-divider/>
              </v-layout>
              <v-layout justify-center class="mb-2">
                <v-btn
                    color="black"
                    @click="show('signup')"
                    outlined>
                  <v-icon>mdi-email</v-icon>
                  Signup using Email
                </v-btn>
              </v-layout>
              <v-layout v-if="providerEnabled('github')" justify-center>
                <v-btn
                    color="black"
                    href="/api/login/github"
                    outlined>
                  <v-icon>mdi-github</v-icon>
                  Signup with GitHub
                </v-btn>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>
