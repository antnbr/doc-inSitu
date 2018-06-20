import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';

import { Articles } from './lists.js';
import { Pictures } from './lists.js';
import { Tags } from './lists.js';
import { Authors } from './lists.js';

Meteor.methods({
  'insertArticle': (article) => {
    // check(article, Articles.simpleSchema());
    Articles.insert(article);
  },

  'insertPicture': (picture) => {
    // check(picture, Pictures.simpleSchema());
    Pictures.insert(picture);
  },

  'newTag': (tag) => {
    var exists = Tags.findOne({ name: tag });
    if (!exists) {
      Tags.insert({ name: tag });
    } else {
      console.log('Tag already exists.');
    }
  },

  'newAuthor': (author) => {
    var exists = Authors.findOne({ name: author });
    if (!exists) {
      Authors.insert({ name: author })
    } else {
      console.log('Author name already exists.');
    }
  },

  'insertTags': (articleId, tags) => {
    tags.forEach((tag) => {
      Articles.update(articleId, { $set: { tags: tags }});
    });
  }
});
