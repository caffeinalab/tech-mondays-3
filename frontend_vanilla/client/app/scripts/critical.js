import track from '~/modules/tracking'
import Scene from '~/modules/scene'

const scene = new Scene()

function update(...args) {
  if (!scene.isStarted) {
    scene.start()
  }
  scene.setPosition(...args)
}
track(update)
