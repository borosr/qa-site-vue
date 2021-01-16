<script>
import Vue from 'vue';
import Login from '@/views/login/index.vue';
import {mapGetters} from "vuex";

export default Vue.extend({
  name: 'Home',
  components:{
    Login
  },
  computed: {
    ...mapGetters('auth', [
        'loggedIn'
    ]),
  }
})
</script>
<style scoped>
</style>

<template>
  <div>
    <div v-if="loggedIn"></div>
    <Login v-else/>
  </div>
</template>
