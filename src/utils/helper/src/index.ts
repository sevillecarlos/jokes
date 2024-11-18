//This is a personal thing, I like to make a helper for a prototype function I'll need, it looks cleaner of my pov
//Some helper seems like useless, but make the code look clean of my pov and traceable
const replaceValue = (value: string, word: string, wordToReplace: string) =>
  value.replace(word, wordToReplace)

const checkInclude = (value: { id: number }[], key: number) => value.some((x) => x.id === key)

const getMathCeil = (value: number) => Math.ceil(value)

const getSlice = (original: (string | number)[], start: number, end: number) =>
  original.slice(start, end)

const pushValue = (
  array: { id: number; emoji: string; key: string }[],
  value: { id: number; emoji: string; key: string },
) => array.push(value)

const laughSound = () => new Audio('/sounds/laugh_effect.mp3').play()

const donkeySound = () => new Audio('/sounds/donkey_effect.mp3').play()

const getRandomValue = (array: (string | number)[]) =>
  array.length ? array[Math.floor(Math.random() * array.length)] : null

const findValue = (array: { id: number; emoji: string; key: string }[], id: number) =>
  array.find((x) => x.id === id)

const getPosition = (array: { id: number; emoji: string; key: string }[], position: number) =>
  array[position]

const emojiCounter = (array: { id: number; emoji: string; key: string }[], emoji: string) =>
  array.filter((x) => x.key === emoji).length

export {
  replaceValue,
  checkInclude,
  getMathCeil,
  getSlice,
  pushValue,
  laughSound,
  donkeySound,
  getRandomValue,
  findValue,
  getPosition,
  emojiCounter,
}
