import { Template } from 'meteor/templating';

import './buttons.html';
import { mode } from '/imports/ui/body.js';
import { isCaptured } from '/imports/ui/scanner/scanner.js';

Template.buttons.helpers({
  mode(currentMode) {
    return mode.get() === currentMode;
  },
  isCaptured() {
    return isCaptured.get();
  }
});

Template.mainBtns.helpers({
  active() {
    // simply returns true when app is not on "rendering articles" mode.
    return (mode.get() !== "render") ? true : false;
  }
});

Template.buttons.events({
  'click #ev_write': () => {
    mode.set("edit");
  },

  'click #ev_scan': () => {
    mode.set("scan");
  },

  'click #ev_print': () => {
    mode.set("print");
  }
});
