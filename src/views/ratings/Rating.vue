<script lang="ts">
import Vue from "vue";
import {AxiosResponse} from "axios";
import {Rating} from "@/store/rating";

export default Vue.extend({
  name: "Rating",
  props: {
    kind: {
      required: true,
      validator: (value: string) => {
        return ['answers', 'questions'].indexOf(value) !== -1
      }
    },
    id: {
      required: true,
      type: String
    },
    rating: {
      required: true,
      type: Number
    },
    disabled: {
      type: Boolean
    }
  },
  data: () => ({
    picked: false
  }),
  methods: {
    execute(command: string) {
      this.$store.dispatch('rating/'+command, {
        kind: this.kind,
        id: this.id
      }).then((rate: AxiosResponse<Rating>) => {
        this.picked = false;
        this.$emit('rated', rate.data.value)
      })
    }
  }
})
</script>

<style scoped type="scss">
.rotate {
  -webkit-transform: rotateX(180deg);
  transform: rotateX(180deg);
}
</style>

<template>
  <v-layout justify-center style="cursor: pointer; max-width: 40px">
    <template v-if="picked">
      <v-hover v-slot="{ hover }">
        <v-icon @click="picked = false"
                :color="hover ? 'warning' : 'grey'"
        >mdi-less-than</v-icon>
      </v-hover>
      <v-layout column>
        <v-hover v-slot="{ hover }">
          <v-icon @click="execute('rate')"
                  size="25"
                  :color="hover ? 'green' : 'grey'"
          >mdi-triangle
          </v-icon>
        </v-hover>
        <v-hover v-slot="{ hover }">
          <v-icon @click="execute('dismissRate')"
                  size="25"
                  :color="hover ? 'black' : 'grey'"
          >mdi-close-box
          </v-icon>
        </v-hover>
        <v-hover v-slot="{ hover }">
          <v-icon @click="execute('unrate')"
                  size="25"
                  :color="hover ? 'red' : 'grey'"
                  class="rotate">mdi-triangle
          </v-icon>
        </v-hover>
      </v-layout>
    </template>
    <template v-else>
        <span :class="{
                  'grey--text': rating === 0,
                  'red--text': rating < 0,
                  'green--text': rating > 0
                 }"
              @click="disabled ? picked = false : picked = true"
        >{{ rating }}</span>
    </template>
  </v-layout>
</template>
