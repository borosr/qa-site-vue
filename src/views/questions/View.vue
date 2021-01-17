<script lang="ts">
import Vue from "vue";
import {Question} from '@/store/questions'
import {AxiosResponse} from "axios";
import {Answer} from "@/store/answers";

export default Vue.extend({
  name: "ViewQuestions",
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
    answer: '',
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
    sendAnswer() {
      if (this.answer) {
        this.$store.dispatch('answers/save', {
          questionId: this.question.id,
          answer: this.answer
        }).then(() => {
          this.answer = ''
          this.answering = false
          this.$store.dispatch('questions/getAnswers', this.$route.params.id)
              .then((answers: AxiosResponse<Answer[]>) => {
                this.answers = answers.data || []
              })
        })
      }
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
                <span :class="{
                  'grey--text': question.rating === 0,
                  'red--text': question.rating < 0,
                  'green--text': question.rating > 0
                 }">
                  {{ question.rating }}
                </span>
                <!-- TODO add plus, minus icons for hover -->
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
                <v-layout align-center justify-center v-if="answering">
                  <v-flex xs12 md6>
                    <v-layout justify-center align-center>
                      <v-textarea
                          v-model="answer"
                          label="Put your answer here..."
                      ></v-textarea>
                    </v-layout>
                    <v-layout>
                      <v-layout justify-start>
                        <v-btn @click="answering = false">Dismiss</v-btn>
                      </v-layout>
                      <v-layout justify-end>
                        <v-btn @click="sendAnswer" color="primary" :disabled="!answer">Send</v-btn>
                      </v-layout>
                    </v-layout>
                  </v-flex>
                </v-layout>
              </v-layout>
            </v-card-actions>
            <v-card-text>
              <template v-if="answers.length">
                <v-list two-line>
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
