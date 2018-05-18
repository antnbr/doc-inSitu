import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { moment } from 'meteor/momentjs:moment';

// --- Lists declarations --- //
export const Articles = new Mongo.Collection('articles');
export const Pictures = new FS.Collection('pictures', {
  stores: [new FS.Store.FileSystem("images", {path: "~/scansWOW"})]
});

const articlesSchema = new SimpleSchema({
  title: String,
  text: String,
  authname: String,
  authinfo: String,
  type: String
}).newContext();

// --- set methods & publishing rights --- //
if (Meteor.isServer) {
  // Allow publication of 'articles'
  Meteor.publish('articles', () => {
    return Articles.find({});
  });

  Pictures.allow({
    'insert': function () {
      // add custom authentication code here
      return true;
    }
  });

  Meteor.methods({
    'articles.insert': (title, text, authname, authinfo, type) => {
      let article = {
        title: title,
        text: text,
        authname: authname,
        authinfo: authinfo,
        type: type
      };

      articlesSchema.validate(article);
      if (articlesSchema.isValid()) {
        Articles.insert({
          title: title,
          text: text,
          authname: authname,
          authinfo: authinfo,
          type: type,
          createdAt: moment().format("DD-MM-YY HH:mm") // current time
        });
      } else {
        console.log("insert denied :");
        console.log(articlesSchema.validationErrors());
      }
    }
  });
}
