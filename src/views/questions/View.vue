<script lang="ts">
import Vue from "vue";
import {Question} from '@/store/questions'
import {AxiosResponse} from "axios";

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
    answers: []
  }),
  async mounted() {
    await Promise.all([
      this.$store.dispatch('questions/getOne', this.$route.params.id),
      this.$store.dispatch('questions/getAnswers', this.$route.params.id)
    ]).then(([question, answers]: [AxiosResponse<Question>, AxiosResponse<{ answered: boolean; answer: string }[]>]) => {
      this.question = question.data
      this.answers = answers.data || []
    })
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
          <v-card>
            <v-card-title>
              <v-layout justify-start align-center>
                <v-btn to="/questions" color="transparent" fab small>
                  &lt;
                </v-btn>
                <v-divider vertical class="mx-4"></v-divider>
                {{ question.title }}
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
                  :value="question.description"
                  disabled/>
              <div>
                <div>{{ question.created_by }}</div>
                <div>{{ question.created_at | formatDate }}</div>
              </div>
            </v-card-subtitle>
            <v-card-actions>
              <v-layout justify-center>
                <v-btn color="primary">Answer</v-btn>
              </v-layout>
            </v-card-actions>
            <v-card-text>
              <template v-if="answers.length">
                <v-list two-line>
                  <template v-for="(a, index) in answers">
                    <v-list-item :key="index">
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
                    <v-divider v-if="index < answers.length - 1" inset :key="index"></v-divider>
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
