import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';

import { Articles } from './lists.js';
import { Pictures } from './lists.js';

Meteor.methods({
  'insertArticle': (article) => {
    // check(article, Articles.simpleSchema());
    Articles.insert(article);
  },

  'insertPicture': (picture) => {
    // check(picture, Pictures.simpleSchema());
    Pictures.insert(picture);
  }
});
