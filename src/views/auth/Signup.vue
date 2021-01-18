<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: "Signup",
  data: () => ({
    username: '',
    password: '',
    passwordConfirm: '',
    fullName: '',
  }),
  methods: {
    signup() {
      if (this.password &&
          this.passwordConfirm &&
          this.password === this.passwordConfirm) {
        this.$store.dispatch('auth/signup', {
          username: this.username,
          password: this.password,
          full_name: this.fullName
        }).then(() => {
          this.$emit('created')
        })
      }
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
        <v-text-field
            v-model="passwordConfirm"
            prepend-icon="mdi-lock"
            name="passwordConfirm"
            label="Password confirmation"
            type="password"></v-text-field>
        <v-text-field
            v-model="fullName"
            prepend-icon="mdi-account"
            name="fullName"
            label="Full name"
            type="text"></v-text-field>
      </v-form>
    </v-layout>
    <v-card-actions>
      <v-btn
          @click="$emit('back')">
        Back
      </v-btn>
      <v-spacer/>
      <v-btn color="black"
             :disabled="!username || !password || !passwordConfirm || password !== passwordConfirm || !fullName"
             outlined
             @click="signup()">Sign-Up
      </v-btn>
    </v-card-actions>
  </v-card-text>
</template>
