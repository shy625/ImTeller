export default function (effect, effectNum) {
  const effectPre = {
    1: '시간단축',
    2: '시야방해',
    3: '카드미리받기',
    4: '나만 추가점수',
    5: '모두 추가점수',
    6: '상대 카드 흑백',
  }[effect]

  const effectPost = {
    1: '초',
    2: '%',
    3: '',
    4: '점',
    5: '점',
    6: '',
  }[effect]

  return [effectPre, effectPost]
}
