<script lang="ts">
import Vue from "vue";
import {AxiosResponse} from "axios";
import {Answer} from "@/store/answers";
import Rating from "@/views/ratings/Rating.vue";

export default Vue.extend({
  name: "MyAnswers",
  components: {Rating},
  data: () => ({
    answers: [] as Answer[]
  }),
  mounted() {
    this.$store.dispatch('answers/myAnswers').then((resp: AxiosResponse<Answer[]>) => {
      this.answers = resp.data
    })
  }
})
</script>

<style scoped>

</style>

<template>
  <v-list>
    <template v-for="(a, index) in answers">
      <v-list-item :key="'list_item_'+index">
        <v-layout align-center>
          <v-list-item-icon>
            <v-icon
                size="30"
                :color="a.answered ? 'green' : 'gray'">mdi-check
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            <v-layout justify-start align-center>
              <Rating
                  :disabled="true"
                  :id="a.id"
                  kind="answers"
                  :rating="a.rating"
              />
              <v-divider class="mx-4" vertical></v-divider>
              <span>{{ a.answer }}</span>
            </v-layout>
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-layout justify-end align-center>
              <div class="mx-2">{{ a.created_at | formatDate }}</div>
              <v-btn :to="`/questions/${a.question_id}/view`"
                     color="transparent"
                     elevation="0"
                     fab
                     x-small>
                <v-icon>mdi-greater-than</v-icon>
              </v-btn>
            </v-layout>
          </v-list-item-subtitle>
        </v-layout>
      </v-list-item>
      <v-divider v-if="index < answers.length - 1" inset :key="'divider_'+index"></v-divider>
    </template>
  </v-list>
</template>
