import { Template } from 'meteor/templating';

import './buttons.html';
import { mode } from '/imports/ui/body.js';
// import { isCaptured } from '/imports/ui/scanner/scanner.js';

export var isSelected = new ReactiveVar("home");

Template.mainBtns.helpers({
  isSelected(currentSelect) {
    return isSelected.get() === currentSelect;
  }
});

Template.mainBtns.events({
  'click #ev_write': (ev, inst) => {
    isSelected.set("write");
    mode.set("edit");
    if (window.stream.active) stream.getVideoTracks()[0].stop();
  },
  'click #ev_scan': (ev, inst) => {
    isSelected.set("scan");
    mode.set("scan");
  },
  'click #ev_print': (ev, inst) => {
    isSelected.set("print");
    mode.set("print");
    if (window.stream.active) stream.getVideoTracks()[0].stop();
  }
});

Template.homeBtn.events({
  'click #ev_home': (ev, inst) => {
    isSelected.set("home");
    mode.set("render");
  }
})
