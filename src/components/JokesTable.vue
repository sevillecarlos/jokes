<template>
  <div>
    <Table :jokes="jokes" />
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
    }
  },
  mounted() {
    this.fetchJokes()
  },
  methods: {
    async fetchJokes() {
      try {
        const {
          Read: { readRandom },
        } = JokesApiMethods
        const responseJokes = await readRandom()
        this.jokes = responseJokes
      } catch (error) {
        console.error(error)
      }
    },
  },
}
</script>
