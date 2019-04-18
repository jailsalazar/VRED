<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md11>
        <material-card color="cyan" title="Self Evaluation" :text="instructions">
          <!-- SELF EVALUATION BEGINS -->
          <v-form>
            <v-window xs12 v-model="step">
              <!-- FIRST PAGE. -->
              <v-window-item :value="1">
                <v-card-text>
                  <v-layout wrap>
                    <v-flex xs12 md6>
                      <v-select :items="levels" v-model="level" label="Level"/>
                    </v-flex>

                    <v-flex xs12 md6>
                      <v-select :items="complexitys" v-model="complexity" label="Complexity"/>
                    </v-flex>

                    <v-flex xs12 md12>
                      <v-subheader>How did the treatment session as a whole make you feel?</v-subheader>
                      <v-card-text>
                        <v-slider
                          v-model="one"
                          :tick-labels="ticksLabels"
                          :max="5"
                          step="1"
                          ticks="always"
                          tick-size="2"
                        />
                      </v-card-text>
                    </v-flex>

                    <v-flex xs12 md12>
                      <v-subheader>How did you feel when you were exposed to the visual of food?</v-subheader>
                      <v-card-text>
                        <v-slider
                          v-model="two"
                          :tick-labels="ticksLabels"
                          :max="5"
                          step="1"
                          ticks="always"
                          tick-size="2"
                        />
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-window-item>

              <v-window-item :value="2">
                <v-card-text>
                  <v-layout wrap>
                    <v-flex xs12 md12>
                      <v-subheader>How did you feel when you saw your heart rate displayed on the screen?</v-subheader>
                      <v-card-text>
                        <v-slider
                          v-model="three"
                          :tick-labels="ticksLabels"
                          :max="5"
                          step="1"
                          ticks="always"
                          tick-size="2"
                        />
                      </v-card-text>
                    </v-flex>

                    <v-flex xs12 md12>
                      <v-subheader>8. How did you feel when you saw your respiratory rate displayed on the screen?</v-subheader>
                      <v-card-text>
                        <v-slider
                          v-model="four"
                          :tick-labels="ticksLabels"
                          :max="5"
                          step="1"
                          ticks="always"
                          tick-size="2"
                        />
                      </v-card-text>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-window-item>

              <v-window-item :value="3">
                <v-card-text>
                  <v-layout wrap>
                    <v-flex xs12 md12>
                      <v-subheader>What was the hardest part of this expierence for you?</v-subheader>
                      <v-textarea name="input-7-1" box auto-grow v-model="five"></v-textarea>
                    </v-flex>

                    <v-flex xs12 md12>
                      <v-subheader>How do you think this treatment session will help you in the real world?</v-subheader>
                      <v-textarea name="input-7-2" box auto-grow v-model="six"></v-textarea>
                    </v-flex>
                  </v-layout>
                </v-card-text>
              </v-window-item>

              <v-window-item :value="4">
                <div class="pa-3 text-xs-center">
                  <h3 class="title font-weight-light mb-2">Evaluation Submitted</h3>
                </div>
              </v-window-item>
            </v-window>

            <v-divider></v-divider>

            <v-card-actions>
              <v-btn :disabled="step === 1" @click="step--" class="back">Back</v-btn>
              <v-spacer></v-spacer>
              <v-btn v-if="step === 3" color="cyan" depressed @click="sendEvaluation()">Submit</v-btn>
              <v-btn v-else @click="step++" color="cyan" depressed>Next</v-btn>
            </v-card-actions>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return {
      level: "",
      complexity: "",
      one: "",
      two: "",
      three: "",
      four: "",
      five: "",
      six: "",
      step: 1,
      ticksLabels: ["1", "2", "3", "4", "5", "Not Sure"],
      complexitys: ["Simple", "Medium", "Complex"],
      levels: ["Self", "Pair", "Multiple"]
    };
  },

  computed: {
    instructions() {
      if (this.step == 3) {
        return "Please answer the following questions in a couple of sentences based on your experiences.";
      } else {
        return "Please rank the following questions based on how you felt throughout your experience with the virtual reality treatment system. 1 = very uncomfortable, 2 = uncomfortable, 3 = neutral, 4 = comfortable, 5 = very comfortable.";
      }
    }
  },

  methods: {
    ...mapActions(["submitEvaluation"]),

    sendEvaluation() {
      let payload = {
        level: this.level,
        complexity: this.complexity,
        one: this.one,
        two: this.two,
        three: this.three,
        four: this.four,
        five: this.five,
        six: this.six
      };

      this.submitEvaluation(payload)
        .then(() => {
          this.step++;
        })
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>

<style>
.back {
  color: rgba(0, 0, 0, 0.87) !important;
}
</style>
