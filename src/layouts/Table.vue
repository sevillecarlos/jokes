<template>
  <div class="notebook-table">
    <table>
      <thead>
        <tr>
          <th>Type</th>
          <th>Joke</th>
          <th>Punchline</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="joke in paginatedJokes" :key="joke.id" class="line">
          <td>{{ joke.type }}</td>
          <td>{{ joke.setup }}</td>
          <td class="hiddenpunchline">{{ joke.punchline }}</td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button @click="movePage(currentPage - 1)" :disabled="currentPage === 1">👈🏽</button>
      <span> {{ currentPage }} 🥸 {{ totalPages }}</span>
      <button @click="movePage(currentPage + 1)" :disabled="currentPage === totalPages">👉🏽</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    jokes: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPage: 1,
      perPage: 10,
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.jokes.length / this.perPage)
    },
    paginatedJokes() {
      const startPag = (this.currentPage - 1) * this.perPage
      const endPag = startPag + this.perPage
      return this.jokes.slice(startPag, endPag)
    },
  },
  methods: {
    movePage(page) {
      if (page < 1 || page > this.totalPages) return
      this.currentPage = page
    },
  },
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

th,
td {
  padding: 6px;
  text-align: left;
  font-size: 14px;
  border-left: 1px solid #ccc;
}

th {
  background-color: #000;
  color: white;
}

td {
  color: black;
}
td:first-child {
  border-left: 5px solid #4a90e2;
}

.notebook-table {
  width: 80%;
  margin: 20px auto;
  background-color: #f2f2f2;
  border: 1px solid #ccc;
  padding: 20px;
  font-family: 'Courier New', 'Arial';
  text-align: center;
}
.line {
  background-color: #f2f2f2;
  border-bottom: 2px solid #dcdcdc;
}

.line:nth-child(odd) {
  background-color: #ffffff;
}

.pagination {
  margin-top: 20px;
  text-align: center;
}

.pagination button {
  padding: 5px 10px;
  font-size: 25px;
  cursor: pointer;
  border: 0px;
}
.pagination span {
  font-size: 25px;
}
.pagination button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}

.hiddenpunchline {
  text-decoration: line-through;
  color: #d3d3d3;
}
</style>
