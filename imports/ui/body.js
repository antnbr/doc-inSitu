import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
// import { ReactiveDict } from 'meteor/reactive-dict';

import { Articles } from '/imports/api/lists.js';
import './body.html';
import './infobar/infobar.js';
import './buttons/addArticle.js';
import './article/article.js';
import './editor/editor.js';
import './userInfo/userInfo.js';
// import './print/print.js';

export let mode = new ReactiveVar("articles");

// set subscription to data
Template.body.onCreated(() => {
  Meteor.subscribe('articles');
});

Template.content.helpers({
  page(currentMode) {
    //console.log(Template.instance());
    return mode.get() === currentMode;
  }
});
