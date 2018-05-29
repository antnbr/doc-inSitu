import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import base64Regex from 'base64-regex';

// --- Lists declarations --- //
export const Articles = new Mongo.Collection('articles');
export const Pictures = new Mongo.Collection('pictures');

export const maxLengths = {
  title: 100,
  text: 5000,
  authname: 30,
  authinfo: 200
};

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
    max: maxLengths.title
  },
  text: {
    type: String,
    label: "Text",
    max: maxLengths.text
  },
  authname: {
    type: String,
    label: "Author Name",
    max: maxLengths.authname
  },
  authinfo: {
    type: String,
    label: "Author Info",
    max: maxLengths.authinfo
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

Schemas.Pictures = new SimpleSchema({
  legend: {
    type: String,
    label: "Legend",
    max: 200
  },
  data: {
    type: String,
    label: "Data",
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
