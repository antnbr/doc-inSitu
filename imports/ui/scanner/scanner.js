import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './scanner.html';
import { Pictures } from '/imports/api/lists.js';

var width = 640;
var height = 480;

// --- set reactive-var -- //
Template.scanner.onCreated(function() {
  this.captureIsOn = new ReactiveVar(false);
  this.isFilled = new ReactiveVar();
})

// --- load stream into video element --- //x
Template.scanner.onRendered(function() {
  var errorElement = document.querySelector('#errorMsg');
  var video = document.querySelector('video');
  var canvas = document.querySelector('#canvas');

  canvas.width = width;
  canvas.height = height;
  this.canvas = canvas;

  video.style.width = document.width + 'px';
  video.style.height = document.height + 'px';
  video.setAttribute('autoplay', '');
  video.setAttribute('muted', '');
  video.setAttribute('playsinline', '');

  this.video = video;

  // Put variables in global scope to make them available to the browser console.
  var constraints = window.constraints = {
    audio: false,
    video: true
  };

  function handleSuccess(stream) {
    var videoTracks = stream.getVideoTracks();
    console.log('Got stream with constraints:', constraints);
    console.log('Using video device: ' + videoTracks[0].label);
    stream.oninactive = function() {
      console.log('Stream inactive');
    };
    window.stream = stream; // make variable available to browser console
    video.srcObject = stream;
  }

  function handleError(error) {
    if (error.name === 'ConstraintNotSatisfiedError') {
      errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
          constraints.video.width.exact + ' px is not supported by your device.');
    } else if (error.name === 'PermissionDeniedError') {
      errorMsg('Permissions have not been granted to use your camera and ' +
        'microphone, you need to allow the page access to your devices in ' +
        'order for the demo to work.');
    }
    errorMsg('getUserMedia error: ' + error.name, error);
  }

  function errorMsg(msg, error) {
    errorElement.innerHTML += '<p>' + msg + '</p>';
    if (typeof error !== 'undefined') {
      console.error(error);
    }
  }

  navigator.mediaDevices.getUserMedia(constraints).
      then(handleSuccess).catch(handleError);
});

// --- Load image helpers --- //
Template.scanner.helpers({
  captureIsOn() {
    return Template.instance().captureIsOn.get();
  },
  isFilled() {
    return Template.instance().isFilled.get();
  }
});

// --- Capture image of video stream --- //
Template.scanner.events({
  'click #ev_take': (event, template) => {
    canvas.getContext('2d').drawImage(template.video, 0, 0, width, height);
    template.isFilled.set("isFilled");
    template.captureIsOn.set(true);
  },

  'click #ev_save': (event, template) => {
    let dataURL = canvas.toDataURL();
    console.log(dataURL);
    let name = moment().format("DD-MM-YY_HH-mm-ss");
  }
});
