import * as handTrack from 'handtrackjs';
const SRC_HEIGHT = 640
let globalCallback

const video = document.querySelector('video')
const canvas = document.querySelector('canvas#video')
const context = canvas.getContext('2d')
let model

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

    if (predictions[0] && predictions[0].bbox) {
      globalCallback(predictions[0], predictions[1])
    }

    // model.renderPredictions(predictions, canvas, context, video);
    requestAnimationFrame(runDetection);
  });
}

function start() {
  handTrack.load({
    flipHorizontal: true,   // flip e.g for video
    maxNumBoxes: 3,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold
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
