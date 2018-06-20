import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// ---- api & html --- //
import './tagsSystem.html';
import '/imports/api/methods.js';

Template.tag.onCreated(function() {
  this.isHover = new ReactiveVar(false);
  this.isChecked = new ReactiveVar(false);
});

Template.tag.helpers({
  isChecked() {
    return (Template.instance().isChecked.get()) ? "checked" : false;
  }
});

Template.tag.events({
  'mouseover .checkmark': function(ev, inst) {
    const t = ev.target;
    if (inst.isChecked.get()) {
      t.style.cssText = 'background-color: ' + this.color +'; font-weight: 700';
    } else { t.style.cssText = 'background-color: ' + this.color + '; font-weight: 400'; }
  },
  'mouseout .checkmark': function(ev, inst) {
    const t = ev.target;
    if (!inst.isChecked.get()) t.style.cssText = 'background-color: white';
  },
  'click .checkmark': function(ev, inst) {
    const t = ev.target;
    inst.isChecked.set(!inst.isChecked.get());
    if (inst.isChecked.get()) {
      t.style.cssText = 'background-color: ' + this.color +'; font-weight: 700'
    } else { t.style.cssText = 'background-color: white; font-weight: 400'; }
  }
});

Template.author.onCreated(function() {
  this.isChecked = new ReactiveVar(false)
})

Template.author.helpers({
  checked() {
    return Template.instance().isChecked.get();
  }
});
