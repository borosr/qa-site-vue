<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "NewQuestion",
  data: () => ({
    title: '',
    description: '',
    titleRules: [(v: string) => v.length <= 100 || 'Max 100 characters'],
    descriptionRules: [(v: string) => v.length <= 600 || 'Max 600 characters']
  }),
  methods: {
    save() {
      this.$store.dispatch('questions/save',
          {
            title: this.title,
            description: this.description
          })
          .then(() => {
            this.$router.replace('/home')
          })
    }
  }
})
</script>

<style scoped>
form {
  width: 60%;
}
</style>

<template>
  <v-container fluid fill-height>
    <v-layout align-start justify-center>
      <v-flex xs12>
        <v-card>
          <v-card-title>Ask a new question</v-card-title>
          <v-card-text>
            <v-layout justify-center>
              <v-form>
                <v-text-field
                    clearable
                    clear-icon="mdi-close-circle"
                    name="title"
                    label="Title"
                    v-model="title"
                    :rules="titleRules"
                    counter
                />
                <!-- TODO this would be a markdown editor -->
                <v-textarea
                    clearable
                    clear-icon="mdi-close-circle"
                    :rules="descriptionRules"
                    counter
                    name="description"
                    label="Description"
                    v-model="description"
                    auto-grow
                />
              </v-form>
            </v-layout>
            <v-card-actions>
              <v-layout justify-start>
                <v-btn to="/home" color="primary">
                  Back
                </v-btn>
              </v-layout>
              <v-layout justify-end>
                <v-btn
                    :disabled="!title || !description"
                    @click="save"
                >Save
                </v-btn>
              </v-layout>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
