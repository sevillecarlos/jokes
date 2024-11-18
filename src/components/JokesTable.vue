<!-- Seperate the component to the layout -->
<template>
  <div>
    <Table :jokes="jokes" :types="types" />
  </div>
</template>

<script>
import Table from '../layouts/Table.vue'
import { JokesApiMethods } from '../api'
export default {
  components: {
    Table,
  },
  data() {
    return {
      jokes: [],
      types: [],
    }
  },
  mounted() {
    this.fetchJokesData()
  },
  methods: {
    async fetchJokesData() {
      try {
        //Let mounted the fetch all the data that we'll need
        const {
          Read: { readRandom, readType },
        } = JokesApiMethods
        const [responseJokes, responseTypes] = await Promise.all([readRandom(), readType()])

        this.jokes = responseJokes
        this.types = responseTypes
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
