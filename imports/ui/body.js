import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// import { ReactiveDict } from 'meteor/reactive-dict';

import './body.html';
import './infobar/infobar.js';
import './buttons/buttons.js';
import './render/render.js';
import './editor/editor.js';
import './scanner/scanner.js';
import './printer/printer.js';
// import './print/print.js';

export let mode = new ReactiveVar("render");

// set subscription to data
Template.body.onCreated(function() {
  Meteor.subscribe('articles');
  Meteor.subscribe('pictures');
});

Template.content.helpers({
  page(currentMode) {
    // console.log(Template.instance());
    return mode.get() === currentMode;
  }
});
