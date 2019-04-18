<template>
  <v-container
    fill-height
    fluid
    grid-list-xl
  >
    <v-layout wrap>
      <v-flex
        md12
        lg12
      >
        <material-card
          color="orange"
          title="Treatment Progress"
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
                class="font-weight-light text-warning text--darken-3"
                v-text="header.text"
              />
            </template>
            <template
              slot="items"
              slot-scope="{ index, item }"
            >
              <td>{{ index + 1 }}</td>
              <td>{{ item.evaluation.complexity }} {{ item.evaluation.level }}</td>
              <td class="text-xs-right">{{ item.createDate }}</td>
              <td class="text-xs-right">{{ "--" }}</td>
            </template>
          </v-data-table>
        </material-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data () {
    return {
      headers: [
        {
          sortable: false,
          text: 'ID',
          value: 'id'
        },
        {
          sortable: false,
          text: 'Scenario',
          value: 'name'
        },
        {
          sortable: false,
          text: 'Date',
          align: 'right'
        },
        {
          sortable: false,
          text: 'Duration',
          align: 'right'
        }
      ],
      items: [],
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false
      }
    }
  },
  computed: {
    getEvaluationList() {
      return this.$store.getters.getEvaluationList;
    }
  },

  methods: {
    ...mapActions([
      "getUser", "getEvaluations"
    ]),

    complete (index) {
      this.list[index] = !this.list[index]
    }
  },

  created() {
    this.getUser();
    this.getEvaluations().then(() => {
      this.items = this.$store.state.evaluations;
    });
  }
}
</script>