import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// import { Articles } from '/imports/api/lists.js';
import './editor.html';
import { mode } from '../body.js';

// --- sets Reactive Vars to check if form is fulfilled --- //
Template.editor.onCreated(function() {
  this.titleIsValid = new ReactiveVar(true);
  this.textIsValid = new ReactiveVar(true);
  this.authnameIsValid = new ReactiveVar(true);
  this.authinfoIsValid = new ReactiveVar(true);
});

Template.editor.helpers({
  titleIsValid() {
    return Template.instance().titleIsValid.get();
  },
  textIsValid() {
    return Template.instance().textIsValid.get();
  },
  authnameIsValid() {
    return Template.instance().authnameIsValid.get();
  },
  authinfoIsValid() {
    return Template.instance().authinfoIsValid.get();
  },
})

// --- EVENTS --- //
Template.editor.events({
  // --- change mode if cancelled --- //
  'click #ev_closeEdit': () => {
    mode.set("articles");
  },

  // --- prevent 'submit' default behavior --- //
  // --- checks if all fields are filled before collecting data --- //
  'submit .editorForm': (event, instance) => {
    event.preventDefault();

    const t = event.target
    const title = t.title.value.trim();
    const text = t.text.value.trim();
    const authname = t.authname.value.trim();
    const authinfo = t.authinfo.value.trim();

    // --- reset reactive-var states --- //
    instance.titleIsValid.set(true);
    instance.authnameIsValid.set(true);
    instance.textIsValid.set(true);
    instance.authinfoIsValid.set(true);

    if (title === '') instance.titleIsValid.set(false);
    if (text === '') instance.textIsValid.set(false);
    if (authname === '') instance.authnameIsValid.set(false);
    if (authinfo === '') instance.authinfoIsValid.set(false);

    // --- load article --- //
    if (title !== '' && text !== '' && authname !== '' && authinfo !== '') {
      Meteor.call('articles.insert', title, text, authname, authinfo);
      mode.set("articles");
    }
  }
});
