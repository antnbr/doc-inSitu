import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

// --- Lists declarations --- //
export const Articles = new Mongo.Collection('articles');

// --- set methods & publishing rights --- //
if (Meteor.isServer) {
  // This code only runs on the server
  // Allow publication of 'articles'
  Meteor.publish('articles', () => {
    return Articles.find({});
  });

  Meteor.methods({
    'articles.insert': (title, text, username) => {
      check(title, String);
      check(text, String);
      check(username, String);

      Articles.insert({
        title,
        username,
        text,
        createdAt: getFrDate() // current time
      });
    },
  });
}
