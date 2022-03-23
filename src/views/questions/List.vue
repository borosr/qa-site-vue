<script lang="ts">
import Vue from "vue";
import {mapGetters} from "vuex";

export default Vue.extend({
  name: "Questions",
  data: () => ({
    page: 1,
    limit: 10,
    count: 0,
    questions: []
  }),
  mounted() {
    this.fetch()
  },
  methods: {
    fetch() {
      this.$store.dispatch('questions/getAll', {
        limit: this.limit,
        offset: (this.page - 1) * this.limit
      }).then((resp) => {
        if (resp.data) {
          this.questions = resp.data.data || []
          this.count = resp.data.count
        }
      })
    }
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
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12>
        <v-card>
          <v-btn
              v-if="loggedIn"
              to="/questions/new"
              color="blue"
              dark
              absolute
              top
              right
              fab
          >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-card-title>
            Questions
          </v-card-title>
          <v-card-text v-if="questions.length">
            <v-list>
              <v-list-item
                  v-for="(q, index) in questions" :key="index"
                  link
                  :to="`/questions/${q.id}/view`"
              >
                <v-list-item-icon>
                  <v-icon v-text="'mdi-help-circle'" size="45"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ q.title }}
                  </v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  {{ q.rating }}
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-pagination
                v-model="page"
                :length="Math.floor(count / limit) + 1"
                @input="fetch"
                circle
            ></v-pagination>
          </v-card-text>
          <v-card-text v-else>
            <v-layout justify-center align-center>
              No question asked yet, be the first, ask something!
            </v-layout>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
