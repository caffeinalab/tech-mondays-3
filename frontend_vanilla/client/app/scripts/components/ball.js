import collides from '~/utils/collides'

export default class Ball {
  alternate = true
  speed = 8
  width = 20
  height = 20
  x = window.innerWidth / 2
  y = window.innerHeight / 2

  yDirection = 1
  xDirection = -1

  resetSpeed(speed) {
    this.speed = 8
  }

  incrementSpeed() {
    this.alternate = !this.alternate
    if (this.alternate) {
      this.speed += 8
    }
  }

  invertY() {
    this.yDirection *= -1
  }

  invertX() {
    this.xDirection *= -1
  }

  invert() {
    this.invertX()
    this.invertY()
  }

  collides(pad) {
    return collides(this, pad)
  }

  update() {
    this.x = this.x + (this.speed * this.xDirection)
    this.y = this.y + (this.speed * this.yDirection)
  }

  draw(ctx) {
    ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height)
  }

}
