import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

// --- Lists declarations --- //
export const Articles = new Mongo.Collection('articles');
export const Pictures = new Mongo.Collection('pictures');
export const Tags = new Mongo.Collection('tags');
export const Authors = new Mongo.Collection('authors');

export const maxLengths = {
  title: 100,
  text: 5000,
  author: 30,
  legend: 200,
  tag: 50,
  color: 7
};

// --- Schemas for lists --- //
const Schemas = {};

Schemas.Articles = new SimpleSchema({
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
  author: {
    type: String,
    label: "Author Name",
    max: maxLengths.author
  },
  tags: {
    type: Array,
    label: "Tags",
    max: maxLengths.authInfo
  },
  'tags.$': {
    type: String,
    max: maxLengths.tag
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

Schemas.Tags = new SimpleSchema({
  name: {
    type: String,
    label: "Tag",
    max: maxLengths.tag
  },
  color: {
    type: String,
    label: "Color",
    autoValue: function() {
      if (this.isInsert) {
        var hue = 'rgb(' + Math.floor(Math.random() * (256 - 100) + 100) + ', '
                         + Math.floor(Math.random() * (256 - 100) + 100) + ', '
                         + Math.floor(Math.random() * (256 - 100) + 100) + ')';
        return hue;
      }
    }
  }
});

Schemas.Authors = new SimpleSchema({
  name: {
    type: String,
    label: "Author",
    max: maxLengths.authName
  }
});

Articles.attachSchema(Schemas.Articles);
Pictures.attachSchema(Schemas.Pictures);
Tags.attachSchema(Schemas.Tags);
Authors.attachSchema(Schemas.Authors);

if (Meteor.isServer) {
  // Allow publication of 'articles'
  Meteor.publish('articles', () => {
    return Articles.find({});
  });
  Meteor.publish('pictures', () => {
    return Pictures.find({});
  });
  Meteor.publish('tags', () => {
    return Tags.find({});
  });
  Meteor.publish('authors', () => {
    return Authors.find({});
  });
}
