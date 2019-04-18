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
              <td>{{ item.name }}</td>
              <td class="text-xs-right">{{ item.salary }}</td>
              <td class="text-xs-right">{{ item.city }}</td>
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
          value: 'salary',
          align: 'right'
        },
        {
          sortable: false,
          text: 'Duration',
          value: 'city',
          align: 'right'
        }
      ],
      items: [
        {
          name: 'Simple Foods',
          city: '---',
          salary: 'Feburary 21, 2019'
        },
        {
          name: 'Complex Foods',
          city: '---',
          salary: 'Feburary 25, 2019'
        }
      ],
      tabs: 0,
      list: {
        0: false,
        1: false,
        2: false
      }
    }
  },
  methods: {
    ...mapActions([
      "getUser"
    ]),

    complete (index) {
      this.list[index] = !this.list[index]
    }
  },

  created() {
    this.getUser();
  }
}
</script>