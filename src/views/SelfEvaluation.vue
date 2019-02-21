<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout justify-center wrap>
      <v-flex xs12 md10>
        <material-card
          color="cyan"
          title="Self Evaluation"
          text="Part 1: Please rank the following questions based on how you felt throughout your experience with the virtual reality treatment system. 1 = very uncomfortable, 2 = uncomfortable, 3 = neutral, 4 = comfortable, 5 = very comfortable "
        >
          <v-form>
            <v-container py-0>
              <v-layout wrap>
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
                    ></v-slider>
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
                    ></v-slider>
                  </v-card-text>
                </v-flex>

                <v-flex xs12 text-xs-right>
                  <v-btn class="mx-0 font-weight-light" color="cyan">Next</v-btn>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
  <!-- <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout
      justify-center
      wrap
    >
      <v-flex
        md12
      >
        <material-card
          color="cyan"
          title="Simple Table"
          text="Here is a subtitle for this table"
        >
          <v-data-table
            :headers="headers"
            :items="items"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text-success text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.country }}</td>
              <td>{{ item.city }}</td>
              <td class="text-xs-right">{{ item.salary }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
      <v-flex
        md12
      >
        <material-card
          color="cyan"
          flat
          full-width
          title="Table on Plain Background"
          text="Here is a subtitle for this table"
        >
          <v-data-table
            :headers="headers"
            :items="items.slice(0, 7)"
            hide-actions
          >
            <template
              slot="headerCell"
              slot-scope="{ header }"
            >
              <span
                class="subheading font-weight-light text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ item }"
            >
              <td>{{ item.name }}</td>
              <td>{{ item.country }}</td>
              <td>{{ item.city }}</td>
              <td class="text-xs-right">{{ item.salary }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>-->
</template>

<script>
export default {
  data() {
    return {
      one: "",
      two: "",
      ticksLabels: ["1", "2", "3", "4", "5", "Not Sure"]
    }
  }
}
</script>