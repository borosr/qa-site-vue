<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: "Login",
  data: () => ({
    username: '',
    password: '',
    formShown: false
  }),
  methods: {
    showForm() {
      this.formShown = true
    },
    login(type: string) {
      switch (type) {
        case 'email':
          this.$store.dispatch('auth/loginDefault', {
            username: this.username,
            password: this.password
          })
      }
    }
  }
})
</script>

<style scoped>

</style>

<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4>
          <v-card
              class="mx-auto"
              max-width="344"
          >
            <v-card-text v-if="formShown">
              <v-layout justify-center>
                <v-form>
                  <v-text-field
                      v-model="username"
                      prepend-icon="mdi-account"
                      name="login"
                      label="Login"
                      type="text"></v-text-field>
                  <v-text-field
                      v-model="password"
                      prepend-icon="mdi-lock"
                      name="password"
                      label="Password"
                      type="password"></v-text-field>
                </v-form>
              </v-layout>
              <v-card-actions>
                <v-spacer/>
                <v-btn color="black" outlined @click="login('email')">Login</v-btn>
              </v-card-actions>
            </v-card-text>
            <v-card-text v-else>
              <v-layout justify-center>
                <v-btn color="black"
                       @click="showForm()"
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
                    outlined>
                  <v-icon>mdi-email</v-icon>
                  Signup using Email
                </v-btn>
              </v-layout>
              <v-layout justify-center>
                <v-btn
                    color="black"
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
  </v-content>
</template>
