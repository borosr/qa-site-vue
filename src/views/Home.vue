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
    ...mapGetters('info', ['visible']),
  }
})
</script>
<style scoped>
</style>

<template>
  <div>
    <template v-if="loggedIn || visible">
      <Questions/>
    </template>
    <Auth v-else/>
  </div>
</template>
