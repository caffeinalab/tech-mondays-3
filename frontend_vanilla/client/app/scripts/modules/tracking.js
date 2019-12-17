import * as handTrack from 'handtrackjs';
const SRC_HEIGHT = 640
let globalCallback

const video = document.querySelector('video')
const canvas = document.querySelector('canvas#video')
const context = canvas.getContext('2d')
let model

function filterPredictions(predictions) {
  predictions.sort((p1, p2) => p1.score - p2.score)

  const hands = []
  let handLeft, handRight

  handLeft = predictions.find(p => p.bbox && p.bbox[0] < 240)
  handRight = predictions.find(p => p.bbox && p.bbox[0] >= 240)

  if (handLeft) {
    hands.push(handLeft)
  }

  if (handRight) {
    hands.push(handRight)
  }

  return hands
}


function startVideo() {
  handTrack.startVideo(video).then(function (status) {
    console.log("video started", status);
    if (status) {
      console.log("Video started. Now tracking")
      runDetection()
    } else {
      console.log("Please enable video")
    }
  });
}

function runDetection() {
  model.detect(video).then(predictions => {
    let hands = []

    if (predictions[0] && predictions[0].bbox) {
      hands = filterPredictions(predictions)
      const [hand1, hand2] = hands
      globalCallback(hand1, hand2)
    }

    model.renderPredictions(hands, canvas, context, video);
    requestAnimationFrame(runDetection);
  });
}

function start() {
  handTrack.load({
    flipHorizontal: true,   // flip e.g for video
    maxNumBoxes: 4,        // maximum number of boxes to detect
    iouThreshold: 0.7,      // ioU threshold for non-max suppression
    scoreThreshold: 0.8,    // confidence threshold
  }).then(lmodel => {
    // detect objects in the image.
    model = lmodel
    console.log("Loaded Model!")
    startVideo()
  });
}

export default function init(callback) {
  globalCallback = callback
  start()
}
