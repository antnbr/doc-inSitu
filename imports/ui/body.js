import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// import { ReactiveDict } from 'meteor/reactive-dict';

// IDEA: always use absolute path instead of relative path when importing.
// ----- use relative path only to get html file.

// --- api functions and html --- //
import './body.html';
// --- ui components --- //
import '/imports/ui/infobar/infobar.js';
import '/imports/ui/render/render.js';
import '/imports/ui/editor/editor.js';
import '/imports/ui/scanner/scanner.js';
import '/imports/ui/printer/printer.js';
import '/imports/ui/buttons/buttons.js';

export let mode = new ReactiveVar("render");

// set subscription to data
Template.body.onCreated(function() {
  Meteor.subscribe('articles');
  Meteor.subscribe('pictures');
  Meteor.subscribe('tags');
  Meteor.subscribe('authors');
});

Template.content.helpers({
  page(currentMode) {
    // console.log(Template.instance());
    return mode.get() === currentMode;
  }
});
