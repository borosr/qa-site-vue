<script>
import Vue from "vue";

export default Vue.extend({
  name: "CallbackProvider",
  mounted() {
    const params = {}
    if (this.$route.params.provider === 'github') {
      params['code'] = this.$route.query.code
    }
    this.$store.dispatch('auth/loginProvider',
        {
          provider: this.$route.params.provider,
          params: params
        }).then(() => {
      this.$router.replace('/')
    })
  }
})
</script>

<style scoped>

</style>

<template>
  <v-main>
    <v-layout justify-center align-center>
      <v-progress-circular
          indeterminate
          color="primary"
      ></v-progress-circular>
    </v-layout>
  </v-main>
</template>
