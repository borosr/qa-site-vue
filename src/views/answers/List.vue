<script lang="ts">
import Vue from "vue";
import {Answer} from "@/store/answers"
import Rating from '@/views/ratings/Rating.vue'

export default Vue.extend({
  name: "Answers",
  components: {Rating},
  props: {
    owner: Boolean,
    answers: {
      type: Array
    },
    editable: {
      type: Boolean,
      default: false
    },
    questionId: {
      type: String,
      required: true
    }
  },
  data: () => ({
    editing: '',
    oldAnswers: {} as any
  }),
  methods: {
    setAnswered(answer: Answer) {
      this.$store.dispatch('questions/setAnswered', {
        answerId: answer.id,
        questionId: this.questionId
      }).then(() => {
        answer.answered = true
      })
    },
    startEditing(answer: Answer) {
      this.oldAnswers[answer.id] = answer.answer
      this.editing = answer.id
    },
    editAnswer(answer: Answer) {
      if (answer.answer) {
        this.$store.dispatch('answers/update', {
          id: answer.id,
          answer: answer.answer
        }).then(() => {
          delete this.oldAnswers[answer.id]
          this.editing = ''
        })
      }
    },
    dismissEdit(answer: Answer) {
      answer.answer = this.oldAnswers[answer.id]
      delete this.oldAnswers[answer.id]
      this.editing = ''
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
              <Rating
                  :disabled="a.created_by === $store.state.auth.auth.id"
                  :id="a.id"
                  kind="answers"
                  :rating="a.rating"
                  @rated="a.rating += $event"
              />
              <v-divider class="mx-4" vertical></v-divider>
              <template v-if="editable && a.created_by === $store.state.auth.auth.id && editing === a.id">
                <v-text-field
                    label="Edit answer"
                    v-model="a.answer"
                ></v-text-field>
                <v-btn class="mx-3" fab color="red" x-small elevation="0" @click="dismissEdit(a)">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-btn class="mx-1" fab color="primary"
                       :disabled="!a.answer"
                       @click="editAnswer(a)" elevation="0" x-small>
                  <v-icon>mdi-check</v-icon>
                </v-btn>
              </template>
              <template v-else>
                <span>{{ a.answer }}</span>
              </template>
            </v-layout>
          </v-list-item-title>
          <v-list-item-subtitle>
            <v-layout justify-end align-center>
              <template v-if="editable && a.created_by === $store.state.auth.auth.id && !editing">
                <v-btn fab x-small
                       elevation="0"
                       color="primary"
                       @click="startEditing(a)">
                  <v-icon>mdi-pencil</v-icon>
                </v-btn>
                <v-divider vertical class="mx-4"/>
              </template>
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

