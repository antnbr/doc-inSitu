import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// --- Lists declarations --- //
export const Articles = new Mongo.Collection('articles');
export const Pictures = new Mongo.Collection('pictures');

export const maxLengths = {
  title: 100,
  text: 5000,
  authname: 30,
  authinfo: 200,
  legend: 200,
};

// --- Schemas for lists --- //
const Schemas = {};

Schemas.Articles = new SimpleSchema({
  articleType: {
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
    max: maxLengths.legend
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
Pictures.attachSchema(Schemas.Pictures);

if (Meteor.isServer) {
  // Allow publication of 'articles'
  Meteor.publish('articles', () => {
    return Articles.find({});
  });
  Meteor.publish('pictures', () => {
    return Pictures.find({});
  });
}
