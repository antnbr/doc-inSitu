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

Template.cancel.events({
  'click #ev_cancel': () => {
    mode.set("render");
  }
});
