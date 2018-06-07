import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// import { ReactiveDict } from 'meteor/reactive-dict';

// try to always use absolute path instead of relative path.
// use relative path only to get html file.
import './body.html';
import '/imports/ui/infobar/infobar.js';
import '/imports/ui/render/render.js';
import '/imports/ui/editor/editor.js';
import '/imports/ui/scanner/scanner.js';
import '/imports/ui/printer/printer.js';

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
