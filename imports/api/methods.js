import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import base64Regex from 'base64-regex';

import { Articles } from './lists.js';

if (Meteor.isServer) {
  Meteor.methods({
    'insertArticle': (article) => {
      check(article, Articles.simpleSchema());
      Articles.insert(article);
    },
    'insertPicture': (legend, data) => {
      check(legend, String);
      check(data, String);
      if (base64Regex({ exact: true }).test(data)) {
        Pictures.insert(legend, data);
      } else {
        console.log("Error: data URI doesn't seem valid...");
      }
    }
  });
}
