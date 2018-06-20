import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// --- api & html --- //
import './textChoice.html';

Template.textChoice.onCreated(function(){
  this.isSelected = new ReactiveVar("raconter");
});

Template.textChoice.helpers({
  isSelected(currentSelect) {
    return Template.instance().isSelected.get() === currentSelect;
  }
});

Template.textChoice.events({
  'click #ev_raconter': (ev, inst) => {
    inst.isSelected.set("raconter");
  },
  'click #ev_commenter': (ev, inst) => {
    inst.isSelected.set("commenter");
  }
});
