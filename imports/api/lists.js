import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { moment } from 'meteor/momentjs:moment';

// --- Lists declarations --- //
export const Articles = new Mongo.Collection('articles');
export const Contributors = new Mongo.Collection('contributors');

const articlesSchema = new SimpleSchema({
  title: String,
  text: String,
  authname: String,
  authinfo: String
}).newContext();

// --- set methods & publishing rights --- //
if (Meteor.isServer) {
  // This code only runs on the server
  // Allow publication of 'articles'
  Meteor.publish('articles', () => {
    return Articles.find({});
  });

  Meteor.methods({
    'articles.insert': (title, text, authname, authinfo) => {
      let article = {
        title: title,
        text: text,
        authname: authname,
        authinfo: authinfo
      };

      articlesSchema.validate(article);
      if (articlesSchema.isValid()) {
        Articles.insert({
          title: title,
          text: text,
          authname: authname,
          authinfo: authinfo,
          createdAt: moment().format("DD-MM-YY HH:mm") // current time
        });
      } else {
        console.log("insert denied :");
        console.log(articlesSchema.validationErrors());
      }
    }
  });
}
