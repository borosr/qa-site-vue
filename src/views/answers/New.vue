<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NewAnswers",
  props: {
    questionId: {
      type: String
    }
  },
  data: () => ({
    answer: '',
  }),
  methods: {
    dismiss() {
      this.$emit('dismiss')
    },
    sendAnswer() {
      if (this.answer) {
        this.$store.dispatch('answers/save', {
          questionId: this.questionId,
          answer: this.answer
        }).then(() => {
          this.answer = ''
          this.$emit('save')
        })
      }
    },
  }

})
</script>

<style scoped>

</style>

<template>
  <v-layout align-center justify-center>
    <v-flex xs12 md6>
      <v-layout justify-center align-center>
        <v-textarea
            v-model="answer"
            label="Put your answer here..."
        ></v-textarea>
      </v-layout>
      <v-layout>
        <v-layout justify-start>
          <v-btn @click="dismiss">Dismiss</v-btn>
        </v-layout>
        <v-layout justify-end>
          <v-btn @click="sendAnswer" color="primary" :disabled="!answer">Send</v-btn>
        </v-layout>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

