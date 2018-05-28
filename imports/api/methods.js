import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import { Articles } from './lists.js';

if (Meteor.isServer) {
  Meteor.methods({
    'insertArticle': (article) => {
      check(article, Articles.simpleSchema());
      Articles.insert(article);
    }
  });
}
