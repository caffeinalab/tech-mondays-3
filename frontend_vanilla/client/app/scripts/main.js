import * as handTrack from 'handtrackjs';
const video = document.querySelector('video')
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
    console.log("Predictions: ", predictions);
    model.renderPredictions(predictions, canvas, context, video);
    requestAnimationFrame(runDetection);
  });
}

function init() {
  handTrack.load({
    flipHorizontal: true,   // flip e.g for video
    maxNumBoxes: 20,        // maximum number of boxes to detect
    iouThreshold: 0.5,      // ioU threshold for non-max suppression
    scoreThreshold: 0.6,    // confidence threshold
  }).then(lmodel => {
    // detect objects in the image.
    model = lmodel
    console.log("Loaded Model!")
    startVideo()
  });
}

if (!window.APP) window.APP = {}
window.APP.init = init
