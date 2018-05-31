import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// import { Articles } from '/imports/api/lists.js';
import './editor.html';
import '/imports/api/methods.js';
import '../buttons/buttons.js';
import { mode } from '../body.js';
import { maxLengths } from '/imports/api/lists.js';

function autoExpand(target) {
  target.style.cssText = 'height: auto; padding: 0;';
  target.style.cssText = 'height:' + target.scrollHeight + 'px';
}

// --- sets Reactive Vars to check if form is fulfilled --- //
Template.editor.onCreated(function() {
  this.titleIsValid = new ReactiveVar(true);
  this.textIsValid = new ReactiveVar(true);
  this.authnameIsValid = new ReactiveVar(true);
  this.authinfoIsValid = new ReactiveVar(true);
  this.typeIsValid = new ReactiveVar(true);
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
  typeIsValid() {
    return Template.instance().typeIsValid.get();
  },
  max(inputName) {
    return maxLengths[inputName];
  }
})

// --- EVENTS --- //
Template.editor.events({
  // --- change mode if cancelled --- //
  'click #ev_closeEdit': () => {
    mode.set("articles");
  },

  'keydown textarea': (ev) => {
    autoExpand(ev.target);
  },

  'onpaste textarea': (ev) => {
    autoExpand(ev.target);
  },

  'submit .editorForm': (ev, inst) => {
    // prevent 'submit' default behavior
    ev.preventDefault();

    const t = ev.target
    // console.log(t);
    const title = t.title.value.trim();
    const text = t.text.value.trim();
    const authname = t.authname.value.trim();
    const authinfo = t.authinfo.value.trim();
    const type = t.type.value;

    // reset reactive-var states
    inst.titleIsValid.set(true);
    inst.authnameIsValid.set(true);
    inst.textIsValid.set(true);
    inst.authinfoIsValid.set(true);
    inst.typeIsValid.set(true);

    // checks if all fields are filled before collecting data
    if (title === '') inst.titleIsValid.set(false);
    if (text === '') inst.textIsValid.set(false);
    if (authname === '') inst.authnameIsValid.set(false);
    if (authinfo === '') inst.authinfoIsValid.set(false);
    if (type === '') inst.typeIsValid.set(false);

    // ---> load article
    if (title !== '' && text !== '' && authname !== '' && authinfo !== '' && type !== '') {
      let article = {
        articleType: type,
        title: title,
        text: text,
        authname: authname,
        authinfo: authinfo
      };

      Meteor.call('insertArticle', article);
      mode.set("render");
    }
  }
});
