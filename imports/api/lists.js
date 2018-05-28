import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// --- Lists declarations --- //
export const Articles = new Mongo.Collection('articles');
export const Pictures = new Mongo.Collection('pictures');

// --- Schemas for lists --- //
const Schemas = {};

Schemas.Articles = new SimpleSchema({
  type: {
    type: String,
    label: "Type"
  },
  title: {
    type: String,
    label: "Title",
    max: 100
  },
  text: {
    type: String,
    label: "Text",
    max: 5000
  },
  authname: {
    type: String,
    label: "Author Name",
    max: 30
  },
  authinfo: {
    type: String,
    label: "Author Info",
    max: 200
  },
  timestamp: {
    type: Date,
    label: "Timestamp",
    autoValue: function() {
      if (this.isInsert) {
        return new Date();
      }
    }
  }
});

Articles.attachSchema(Schemas.Articles);
Pictures.attachSchema(Schemas.Articles);

if (Meteor.isServer) {
  // Allow publication of 'articles'
  Meteor.publish('articles', () => {
    return Articles.find({});
  });
  Meteor.publish('pictures', () => {
    return Pictures.find({});
  });
}
