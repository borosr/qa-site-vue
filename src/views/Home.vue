<script lang="ts">
import Vue from 'vue';
import Auth from '@/views/auth/Auth.vue';
import {mapGetters} from "vuex";

export default Vue.extend({
  name: 'Home',
  components:{
    Auth
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
    <div v-if="loggedIn">
      <router-view/>
    </div>
    <Auth v-else/>
  </div>
</template>
