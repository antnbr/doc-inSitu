import { Template } from 'meteor/templating';
// import { ReactiveDict } from 'meteor/reactive-dict';

import { Articles } from '/imports/api/lists.js';
import './body.html';
import './infobar.js';
import './article.js';

// set subscription to data
Template.body.onCreated(() => {
  Meteor.subscribe('articles');
});

Template.body.helpers({
  'articles': () => {
    return Articles.find({}, { sort: { createdAt: -1 }});
  }
});
