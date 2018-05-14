import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { moment } from 'meteor/momentjs:moment';

// --- Lists declarations --- //
export const Articles = new Mongo.Collection('articles');
export const Contributors = new Mongo.Collection('contributors');

// --- set methods & publishing rights --- //
if (Meteor.isServer) {
  // This code only runs on the server
  // Allow publication of 'articles'
  Meteor.publish('articles', () => {
    return Articles.find({});
  });

  Meteor.methods({
    'articles.insert': (title, username, text) => {
      check(title, String);
      // check(username, String);
      check(text, String);

      Articles.insert({
        title,
        // username,
        text,
        createdAt: moment().format("DD-MM-YY HH:mm") // current time
      });
    },
  });
}
