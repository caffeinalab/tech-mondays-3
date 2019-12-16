import { cap, lerp } from '@okiba/math'
const PAD_HEIGHT = 100


export default class Pad {
  width = 20
  height = PAD_HEIGHT
  y = window.innerHeight / 2

  constructor({right = false}) {
    this.x = right
      ? window.innerWidth - 50 - this.width / 2
      : 50 - this.width / 2

    this.yPerc = 0.5
  }

  setHand(hand) {
    if (!hand || !hand.bbox) return
    const y = hand.bbox[1]
    const height = hand.bbox[3]

    const yPerc = cap(y / (640 - (height * 3)), 0, 1)
    this.yPerc = lerp(this.yPerc, yPerc, 0.1)
    this.y = (this.yPerc * window.innerHeight) - (this.height / 2)
  }

  draw(ctx) {
    ctx.fillStyle = '#fff'
    ctx.fillRect(this.x, this.y, this.width, this.height)
  }

  resize() {
    this.y = (this.yPerc * window.innerHeight) - (this.height / 2)
  }
}
