<script lang="ts">
import Vue from "vue";
import {Answer} from "@/store/answers";

export default Vue.extend({
  name: "Answers",
  props: {
    owner: Boolean,
    answers: {
      type: Array
    }
  },
  methods: {
    setAnswered(answer: Answer) {
      this.$store.dispatch('questions/setAnswered', {
        answerId: answer.id,
        questionId: this.question.id
      }).then(() => {
        answer.answered = true
      })
    }
  }

})
</script>

<style scoped>

</style>

<template>
  <v-list two-line>
    <template v-for="(a, index) in answers">
      <v-list-item :key="'list_item_'+index">
        <v-layout align-center>
          <v-list-item-icon>
            <v-btn
                fab
                small
                @click="setAnswered(a)"
                v-if="owner">
              <v-icon :color="a.answered ? 'green' : 'gray'">mdi-check</v-icon>
            </v-btn>
            <v-icon
                v-else
                size="30"
                :color="a.answered ? 'green' : 'gray'">mdi-check
            </v-icon>
          </v-list-item-icon>
          <v-list-item-title>
            <v-layout justify-start align-center>
                            <span :class="{ 'grey--text': a.rating === 0,
                      'red--text': a.rating < 0, 'green--text': a.rating > 0}">{{ a.rating }}</span>
              <v-divider class="mx-4" vertical></v-divider>
              <span>{{ a.answer }}</span>
            </v-layout>
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-layout justify-end align-center>
              <div>
                <div>{{ a.created_by }}</div>
                <div>{{ a.created_at | formatDate }}</div>
              </div>
            </v-layout>
          </v-list-item-subtitle>
        </v-layout>
      </v-list-item>
      <v-divider v-if="index < answers.length - 1" inset :key="'divider_'+index"></v-divider>
    </template>
  </v-list>
</template>

