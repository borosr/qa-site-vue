<script lang="ts">
import Vue from "vue";
import {mapGetters} from "vuex";

export default Vue.extend({
  name: "Profile",
  data: () => ({
    user: {
      username: '',
      fullName: '',
      password: '',
      passwordConfirm: '',
    },
  }),
  computed: {
    ...mapGetters('auth', ['kind'])
  },
  mounted() {
    this.$store.dispatch('auth/getUserData').then(value => {
      this.user.username = value.data.username
      this.user.fullName = value.data.full_name
    })
  },
  methods: {
    updateProfile() {
      this.$store.dispatch('auth/updateProfile', this.user)
    }
  }
})
</script>

<style scoped>
form {
  width: 60%;
}
</style>

<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md6>
          <v-card>
            <v-card-title>
              Profile details
            </v-card-title>
            <v-card-text>
              <v-layout justify-center>
                <v-form>
                  <v-text-field
                      name="username"
                      label="Username"
                      v-model="user.username"
                      disabled
                  ></v-text-field>
                  <v-text-field
                      name="full_name"
                      label="Full name"
                      v-model="user.fullName"
                  ></v-text-field>
                  <template v-if="kind === 'DefaultLogin'">
                    <v-text-field
                        name="password"
                        label="Password"
                        v-model="user.password"
                        type="password"
                    ></v-text-field>
                    <v-text-field
                        name="password_confirm"
                        label="Password confirmation"
                        v-model="user.passwordConfirm"
                        type="password"
                    ></v-text-field>
                  </template>
                </v-form>
              </v-layout>
            </v-card-text>
            <v-card-actions>
              <v-flex>
                <v-layout justify-end>
                  <v-btn
                      :disabled="!user.fullName || user.fullName.length < 5 || (user.password !== user.passwordConfirm)"
                      @click="updateProfile"
                  >Save</v-btn>
                </v-layout>
              </v-flex>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>
