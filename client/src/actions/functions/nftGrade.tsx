export default function (props) {
  const { cardList } = props
  let cardGrade = { S: 0, A: 0, B: 0, C: 0 }
  let result: string = ''

  for (let card of cardList) {
    cardGrade[card.grade] += 1
  }

  for (let key in cardGrade) {
    if (cardGrade[key] !== 0) {
      result += key.repeat(cardGrade[key])
    }
  }

  return result
}
