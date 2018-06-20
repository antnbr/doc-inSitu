// --- packages --- //
import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';
import { Mongo } from 'meteor/mongo';
// --- api & html --- //
import './article.html';
import { Tags } from '/imports/api/lists.js';

Template.article.helpers({
  newTimestamp() {
    // console.log(this);
    return moment(this.timestamp).format("DD/MM/YYYY - HH:mm");
  },
  articleTags() {
    // console.log(this.tags);
    return this.tags;
  }
});

Template.articleTag.onCreated(function() {
  this.subscribe('tags');
});

Template.articleTag.helpers({
  tag() {
    // console.log(this.toString());
    var tag = Tags.findOne({ _id: this.toString() });
    // console.log(tag);
    if (tag) return tag.name;
  },
  background() {
    var tag = Tags.findOne({ _id: this.toString() });
    return "background-color: " + tag.color;
  }
});
