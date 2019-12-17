import { cap, lerp } from '@okiba/math'
const PAD_HEIGHT = 100
const handyEl = document.querySelector('#handy')
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
    const yPerc = map(~~y, 50, 350, 0, 1)
    handy.textContent = 'y' + yPerc
    this.yPerc = lerp(this.yPerc, yPerc, 0.2)
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


// From p5.js
function constrain(n, low, high) {
  return Math.max(Math.min(n, high), low);
}

// From p5.js
function map(n, start1, stop1, start2, stop2) {
  const newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
  if (start2 < stop2) {
    return constrain(newval, start2, stop2);
  } else {
    return constrain(newval, stop2, start2);
  }
}
