<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: "Login",
  data: () => ({
    username: '',
    password: '',
  }),
  methods: {
    login() {
      this.$store.dispatch('auth/loginDefault', {
        username: this.username,
        password: this.password
      })
    }
  }
})
</script>

<style scoped>

</style>

<template>
  <v-card-text>
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
      <v-btn @click="$emit('back')">Back</v-btn>
      <v-spacer/>
      <v-btn color="black" outlined @click="login()">Login</v-btn>
    </v-card-actions>
  </v-card-text>
</template>
