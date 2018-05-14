import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// import { Articles } from '/imports/api/lists.js';
import './editor.html';
import { mode } from '../body.js';



Template.editor.onCreated(function() {
  // set reactive vars to check if field is empty
  this.titleIsValid = new ReactiveVar(true);
  this.usernameIsValid = new ReactiveVar(true);
  this.textIsValid = new ReactiveVar(true);
});

Template.editor.helpers({
  titleIsValid() {
    return Template.instance().titleIsValid.get();
  },
  usernameIsValid() {
    return Template.instance().usernameIsValid.get();
  },
  textIsValid() {
    return Template.instance().textIsValid.get();
  }
})

Template.editor.events({
  'click #ev_closeEditArticle': () => {
    mode.set("articles");
  },

  'click #ev_submitArticle': (event, instance) => {
    var title = instance.find('#title').value.trim();
    var username = instance.find('#username').value.trim();
    var text = instance.find('#text').value.trim();
    instance.titleIsValid.set(true);
    instance.usernameIsValid.set(true);
    instance.textIsValid.set(true);

    if (title === '') {
      instance.titleIsValid.set(false);
    }
    if (username === '') {
      instance.usernameIsValid.set(false);
    }
    if (text === undefined || text === '') {
      instance.textIsValid.set(false);
    }
    if (title !== '' && username !== '' && text !== '') {
      Meteor.call('articles.insert', title, username, text);
      mode.set("articles");
    }
  }
});
