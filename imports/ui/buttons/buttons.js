import { Template } from 'meteor/templating';

import './buttons.html';
import { mode } from '/imports/ui/body.js';

Template.buttons.helpers({
  mode(currentMode) {
    return mode.get() === currentMode;
  }
});

Template.add.events({
  'click #ev_add': () => {
    mode.set("edit");
  }
});

Template.scan.events({
  'click #ev_scan': () => {
    mode.set("scan");
  }
});

Template.cancel.events({
  'click #ev_cancel': () => {
    mode.set("articles");
  }
});
