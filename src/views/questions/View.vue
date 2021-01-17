<script lang="ts">
import Vue from "vue";
import {Question} from '@/store/questions'
import {AxiosResponse} from "axios";
import {Answer} from "@/store/answers";
import Answers from '@/views/answers/List.vue'
import NewAnswer from '@/views/answers/New.vue'
import Rating from '@/views/ratings/Rating.vue'

export default Vue.extend({
  name: "ViewQuestions",
  components: {Answers, NewAnswer, Rating},
  data: () => ({
    question: {
      id: '',
      title: '',
      description: '',
      created_by: '',
      created_at: '',
      status: '',
      rating: 0
    },
    answers: [],
    answering: false,
    editing: false,
    originalQuestion: {
      title: '',
      description: '',
    }
  }),
  async mounted() {
    await Promise.all([
      this.$store.dispatch('questions/getOne', this.$route.params.id),
      this.$store.dispatch('questions/getAnswers', this.$route.params.id)
    ]).then(([question, answers]: [AxiosResponse<Question>, AxiosResponse<Answer[]>]) => {
      this.question = question.data
      this.answers = answers.data || []
    })
  },
  methods: {
    startEditing() {
      this.editing = true
      this.originalQuestion.title = this.question.title
      this.originalQuestion.description = this.question.description
    },
    editQuestion() {
      this.$store.dispatch('questions/update', {
        id: this.question.id,
        title: this.question.title,
        description: this.question.description
      }).then(() => {
        this.editing = false
        this.originalQuestion.title = ''
        this.originalQuestion.description = ''
      })
    },
    deleteQuestion() {
      this.$store.dispatch('questions/delete', this.question.id).then(() => {
        this.$router.replace('/questions')
      })
    },
    dismissEdit() {
      this.question.title = this.originalQuestion.title
      this.question.description = this.originalQuestion.description
      this.editing = false
    },
    answerSaved() {
      this.answering = false
      this.$store.dispatch('questions/getAnswers', this.$route.params.id)
          .then((answers: AxiosResponse<Answer[]>) => {
            this.answers = answers.data || []
          })
    }
  }
})
</script>

<style scoped type="scss">
</style>

<template>
  <v-main>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12>
          <v-card v-if="editing">
            <v-card-actions>
              <v-layout justify-center>
                <v-btn @click="dismissEdit">Dismiss</v-btn>
                <v-btn @click="editQuestion" color="primary">Edit</v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
          <v-card>
            <v-btn
                v-if="!editing && question.created_by === $store.state.auth.auth.id"
                @click="startEditing"
                color="blue"
                x-small
                dark
                absolute
                top
                right
                fab
            >
              <v-icon>mdi-pencil</v-icon>
            </v-btn>
            <v-btn
                v-if="question.created_by === $store.state.auth.auth.id"
                @click="deleteQuestion"
                color="red"
                x-small
                dark
                absolute
                top
                right
                fab
                style="right: 5vw"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
            <v-card-title>
              <v-layout justify-start align-center>
                <v-btn to="/questions" color="transparent" fab small>
                  &lt;
                </v-btn>
                <v-divider vertical class="mx-4"></v-divider>
                <template v-if="editing">
                  <v-text-field v-model="question.title"></v-text-field>
                </template>
                <template v-else>
                  {{ question.title }}
                </template>
              </v-layout>
              <v-spacer/>
              <v-layout justify-end align-center>
                <v-flex xs4>
                  <Rating
                      :disabled="question.created_by === $store.state.auth.auth.id"
                      :id="question.id"
                      kind="questions"
                      :rating="question.rating"
                      @rated="question.rating += $event"
                  />
                </v-flex>
              </v-layout>
            </v-card-title>
            <v-card-subtitle>
              <v-textarea
                  auto-grow
                  background-color="grey lighten-3"
                  v-model="question.description"
                  :disabled="!editing"/>
              <div>
                <div>{{ question.created_by }}</div>
                <div>{{ question.created_at | formatDate }}</div>
              </div>
            </v-card-subtitle>
            <v-card-actions>
              <v-layout justify-center>
                <v-btn color="primary" @click="answering = true" v-show="!answering">Answer</v-btn>
                <NewAnswer v-if="answering"
                           :questionId="question.id"
                           @dismiss="answering = false"
                           @save="answerSaved"/>
              </v-layout>
            </v-card-actions>
            <v-card-text>
              <Answers
                  v-if="answers.length"
                  :owner="question.created_by === $store.state.auth.auth.id"
                  :answers="answers"
                  :editable="true"
              />
              <template v-else>
                <v-layout justify-center>
                  No one answered this question, be the first!
                </v-layout>
              </template>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-main>
</template>
