import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating';

import { Articles } from '/imports/api/lists.js';
import './editor.html';
import { mode } from '../body.js';



Template.editor.onCreated(function() {
  // set reactive vars to check if field is empty
  this.isValid = new ReactiveVar({
    title: true,
    username: true,
    text: true
  });
});

Template.editor.helpers({
  // since we don't want to use {{#unless}}, helpers return opposite results.
  titleIsValid() {
    return !Template.instance().isValid.get().title;
  },
  usernameIsValid() {
    return !Template.instance().isValid.get().username;
  },
  textIsValid() {
    return !Template.instance().isValid.get().text;
  }
})

Template.editor.events({
  'click #ev_closeEditArticle': () => {
    mode.set("articles");
  },

  'click #ev_submitArticle': (event, instance) => {
    var title = instance.find('#title').value.trim();
    var username = instance.find('#username').value.trim();
    var text = instance.find('#text').innerText;
    instance.isValid.set({
      title: true,
      username: true,
      text: true
    });

    if (title === '') {
      instance.isValid.set({ title: false });
    } else if (username === '') {
      instance.isValid.set({ username: false });
    } else if (text === '') {
      instance.isValid.set({ text: false });
    } else {
      Meteor.call('articles.insert', title, username, text);
      mode.set("articles");
    }
  }
});
