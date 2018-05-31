import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import base64Regex from 'base64-regex';

import './scanner.html';
import { mode } from '../body.js';

export let isCaptured = new ReactiveVar(false);
var width = 640;
var height = 480;

// --- set reactive-var -- //
Template.scanner.onCreated(function() {
  isCaptured.set(false);
})

// --- load stream into video element --- //x
Template.scanner.onRendered(function() {
  var errorElement = document.querySelector('#errorMsg');
  var video = document.querySelector('video');
  var canvas = document.querySelector('#canvas');

  canvas.width = width;
  canvas.height = height;

  video.setAttribute('autoplay', 'true');
  video.setAttribute('muted', 'true');
  video.setAttribute('playsinline', 'true');

  this.video = video;
  this.canvas = canvas;

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
    window.stream = stream;
    localStream = stream; // make variable available to browser console
    video.srcObject = stream;
  }

  function handleError(error) {
    if (error.name === 'ConstraintNotSatisfiedError') {
      errorMsg('The resolution ' + constraints.video.width.exact + 'x' +
          constraints.video.height.exact + ' px is not supported by your device.');
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

  function drawText(text) {
    let ctx = canvas.getContext('2d');
    ctx.fillStyle = 'deeppink';
    ctx.font = "20px Fantasque Sans Mono";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width/2, canvas.height/2);
  }

  navigator.mediaDevices.getUserMedia(constraints)
    .then(handleSuccess).catch(handleError);
  drawText('Enregistrez votre image !');
});

Template.scanner.helpers({
  isCaptured() {
    return isCaptured.get();
  }
});

// --- Capture image of video stream --- //
Template.scanner.events({
  'click #ev_capture': (ev, temp) => {
    canvas.getContext('2d').drawImage(temp.video, 0, 0, width, height);
    isCaptured.set(true);
  },

  'click #ev_save': (ev, temp) => {
    let dataURL = canvas.toDataURL();
    let legend = temp.find('input').value.trim();
    // console.log(dataURL);

    if (base64Regex().test(dataURL)) {
      let picture = {
        legend: legend,
        data: dataURL
      };
      Meteor.call('insertPicture', picture);

      stream.getVideoTracks()[0].stop();
      mode.set("render");
    } else {
      console.log("Data URL doesn't seem valid...");
    }
  },

  'click #ev_cancel': () => {
    stream.getVideoTracks()[0].stop();
  }
});
