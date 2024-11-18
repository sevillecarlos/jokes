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
          <td :class="checkInclude(revealJokes, joke.id) ? '' : 'hiddenpunchline'">
            {{ joke.punchline }}
            <button v-if="!checkInclude(revealJokes, joke.id)" @click="revealPunchline(joke.id)">
              Reveal 🥁
            </button>
            <span v-else>{{ findValue(revealJokes, joke.id).emoji }}</span>
          </td>
        </tr>
      </tbody>
    </table>

    <div class="pagination">
      <button @click="movePage(current - 1)" :disabled="current === 1">👈🏽</button>
      <span> {{ current }} 🥸 {{ totalPages }}</span>
      <button @click="movePage(current + 1)" :disabled="current === totalPages">👉🏽</button>
    </div>

    <div class="counter-container">
      <span>{{ getPosition(revealType, 0).emoji }} - {{ laughCounter }}</span>
      <br />
      <span>{{ getPosition(revealType, 1).emoji }} - {{ donkeyCounter }}</span>
    </div>

    <div v-if="laughCounter === 1 && !prize" class="prize-container">
      <button @click="prizeJoke">Prize Joke 🏆</button>
    </div>

    <div class="prize-container" v-if="prize">
      <span> Select your type prize joke 🤩</span>
      <br />
      <ul v-if="!prizeJokeType" class="types-list">
        [
        <li v-for="(type, index) in types" :key="index" @click="getPrizeRandomJokeType(type)">
          "{{ type }}",
        </li>
        ]
      </ul>
      <span v-else>
        <span>Q: {{ getPosition(this.prizeJokeType, 0).setup }}</span>
        <br />
        <span>A: {{ getPosition(this.prizeJokeType, 0).punchline }} 🥁</span>
      </span>
    </div>
  </div>
</template>

<script>
import {
  getMathCeil,
  checkInclude,
  getSlice,
  pushValue,
  laughSound,
  donkeySound,
  getRandomValue,
  findValue,
  getPosition,
  emojiCounter,
} from '@/utils/helper/src'

import { JokesApiMethods } from '../api'

export default {
  props: {
    jokes: {
      type: Array,
      required: true,
    },
    types: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      current: 1,
      maxPage: 10,
      revealJokes: [],
      revealType: [
        { key: 'laugh', emoji: '🤣' },
        { key: 'donkey', emoji: '🐴' },
      ],
      prize: false,
      prizeJokeType: '',
    }
  },
  computed: {
    //Pagination logic computed
    totalPages() {
      return getMathCeil(this.jokes.length / this.maxPage)
    },
    paginatedJokes() {
      const startPag = (this.current - 1) * this.maxPage
      const endPag = startPag + this.maxPage
      return getSlice(this.jokes, startPag, endPag)
    },
    //Counter logis, this is for count how many laugh or donkey you reveal :D
    laughCounter() {
      return emojiCounter(this.revealJokes, 'laugh')
    },
    donkeyCounter() {
      return emojiCounter(this.revealJokes, 'donkey')
    },
  },
  methods: {
    movePage(page) {
      if (page < 1 || page > this.totalPages) return
      this.current = page
    },
    //Lets make the logic for reveal the joke, this method have the function of save the revealed joke and generate the sound
    revealPunchline(id) {
      const selected = getRandomValue(this.revealType)
      pushValue(this.revealJokes, { id, ...selected })
      if (selected.key === 'laugh') {
        laughSound()
      } else {
        donkeySound()
      }
    },
    prizeJoke() {
      this.prize = true
    },
    //For fetching your prize joke by type
    async getPrizeRandomJokeType(type) {
      try {
        const {
          Read: { readRandomType },
        } = JokesApiMethods

        const responseRandomJokeType = await readRandomType(type)
        this.prizeJokeType = responseRandomJokeType
      } catch (error) {
        console.error(error)
      }
    },
    checkInclude,
    findValue,
    getPosition,
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
  background-color: #3588e7;
  color: white;
}

td {
  color: black;
}
td:first-child {
  border-left: 0px solid #ffffff;
}
/* This notebook-table style is not 100% mine, I saw it and liked and I though this is the perfect scenario to try out*/

.notebook-table {
  width: 80%;
  margin: 20px auto;
  background-color: white;
  padding: 20px;
  font-family: 'Courier New', 'Arial';
  text-align: center;
}
.line {
  background-color: white;
  border-bottom: 2px solid grey;
}

.line:nth-child(odd) {
  background-color: white;
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
  background-color: white;
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

.hiddenpunchline button {
  background-color: #4a90e2;
  color: white;
  border: 1px;
}

.prize-container {
  text-align: right;
}

.prize-container button {
  padding: 10px 20px;
  font-size: 18px;
  background-color: #ffd700;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  animation: prizeAnimation 0.3s ease-in-out infinite;
}

.prize-text {
  animation: prizeAnimation 2s ease-in-out infinite;
}

.counter-container {
  text-align: left;
  font-size: xx-large;
}

.types-list {
  list-style-type: none;
  padding-left: 0;
  display: inline-flex;
  gap: 15px;
  margin-top: 10px;
  text-align: right;
}

.types-list li {
  font-size: 16px;
  color: black;
  cursor: pointer;
}
@keyframes prizeAnimation {
  0% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(20px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
