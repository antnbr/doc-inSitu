import { Template } from 'meteor/templating';

import './buttons.html';
import { mode } from '/imports/ui/body.js';
// import { isCaptured } from '/imports/ui/scanner/scanner.js';

Template.buttons.helpers({
  mode(currentMode) {
    return mode.get() === currentMode;
  }
});

Template.mainBtns.helpers({
  activeMode(currentMode) {
    // simply returns true when app is not on "rendering" mode.
    return mode.get() !== "render" && mode.get() === currentMode;
  }
});

Template.mainBtns.events({
  'click #ev_write': (ev, inst) => {
    mode.set("edit");
  },
  'click #ev_scan': (ev, inst) => {
    mode.set("scan");
  },
  'click #ev_print': (ev, inst) => {
    mode.set("print");
  }
});

Template.cancelBtn.events({
  'click #ev_cancel': (ev, inst) => {
    mode.set("render");
  }
});
