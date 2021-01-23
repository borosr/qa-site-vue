<script lang="ts">
import Vue from 'vue';
import Auth from '@/views/auth/Auth.vue';
import {mapGetters} from "vuex";
import Questions from '@/views/questions/List.vue'

export default Vue.extend({
  name: 'Home',
  components:{
    Auth, Questions
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
    <template v-if="loggedIn">
      <Questions/>
    </template>
    <Auth v-else/>
  </div>
</template>
