import Component from '@okiba/component'
import {qs} from '@okiba/dom'
import {cap} from '@okiba/math'
import EventManager from '@okiba/event-manager'
import SizesCache from '@okiba/sizes-cache'
import Pad from '~/components/pad'
import Ball from '~/components/ball'
import collides from '~/utils/collides'

let p1Score = 0
let p2Score = 0

const p1ScoreEl = qs('#score-l')
const p2ScoreEl = qs('#score-r')
const pauseEl = qs('#pause')

export default class Scene extends Component {
  constructor() {
    super({el: qs('canvas#scene')})
    this.ctx = this.el.getContext('2d')
    this.pad1 = new Pad({right: false})
    this.pad2 = new Pad({right: true})
    this.ball = new Ball()
    this.onResize()
    this.setPosition(window.innerHeight / 2, 0)
    this.canTogglePause = true
  }

  start() {
    this.isStarted = true
    this.listen()
  }

  setScore(player) {
    if (player === 1) {
      ++p1Score
      p1ScoreEl.textContent = p1Score
    } else {
      ++p2Score
      p2ScoreEl.textContent = p2Score
    }
  }

  togglePause() {
    if (this.canTogglePause) {
      this.isPaused = !this.isPaused
      pauseEl.style.opacity = this.isPaused ? 1 : 0
      this.canTogglePause = false
      setTimeout(_ => this.canTogglePause = true, 1000)
    }
  }

  handCollide(hand1, hand2) {
    if (!hand1 || !hand2) return false
    if (!hand1.bbox || !hand2.bbox) return false
    if (!hand1.bbox.length || !hand2.bbox.length) return false

    const [x1, y1, width1, height1] = hand1.bbox
    const [x2, y2, width2, height2] = hand2.bbox
    const rect1 = {
      x: x1, y: y1, width: width1, height: height1
    }
    const rect2 = {
      x: x2, y: y2, width: width2, height: height2
    }

    return collides(rect1, rect2)
  }

  setPosition = (hand1, hand2) => {
    if (this.handCollide(hand1, hand2)) {
      this.togglePause()
      return
    }

    let leftHand, rightHand

    if (hand1 && hand1.bbox && hand1.bbox[0] < 240) {
      leftHand = hand1
    }
    if (hand2 && hand2.bbox && hand2.bbox[0] < 240) {
      leftHand = hand2
    }

    if (hand1 && hand1.bbox && hand1.bbox[0] >= 240) {
      rightHand = hand1
    }
    if (hand2 && hand2.bbox && hand2.bbox[0] >= 240) {
      rightHand = hand2
    }

    this.pad1.setHand(leftHand)
    this.pad2.setHand(rightHand)
  }

  reset() {
    this.ball.x = this.W / 2
    this.ball.y = this.H / 2
    this.ball.invertX()
    this.ball.resetSpeed()
  }

  update() {
    this.ball.update()

    if (
      this.ball.collides(this.pad1)
      || this.ball.collides(this.pad2)
    ) {
      this.ball.invertX()
      this.ball.incrementSpeed()
      return
    }

    if (this.ball.y >= this.H || this.ball.y <= 0) {
      this.ball.invertY()
      return
    }

    if (this.ball.x >= this.W) {
      this.reset()
      this.setScore(1)
    } else if (this.ball.x <= 0) {
      this.reset()
      this.setScore(2)
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.W, this.H)
    this.pad1.draw(this.ctx)
    this.pad2.draw(this.ctx)
    this.ball.draw(this.ctx)
  }

  onRaf = () => {
    if (this.isPaused) return

    this.update()
    this.draw()
  }

  onResize = () => {
    const {width, height} = SizesCache.get(this.el)
    this.el.width = this.W = width
    this.el.height = this.H = height
    this.pad1.resize()
    this.pad2.resize()
  }

  listen() {
    EventManager.on('raf', this.onRaf)
    EventManager.on('resize', this.onResize)
  }
}
