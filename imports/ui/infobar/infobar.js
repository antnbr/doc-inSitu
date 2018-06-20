import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';

import './infobar.html';
import { Articles } from '/imports/api/lists.js';
import { Pictures } from '/imports/api/lists.js';

Template.infobar.onCreated(function() {
  this.subscribe('articles');
});

Template.infobar.helpers({
  hasArticles() {
    return Articles.find().count() !== 0;
  },

  firstPost() {
    let first = Articles.findOne({}, { sort: { timestamp: 1 }});
    // console.log(first);
    return moment(first.timestamp).format("DD/MM/YYYY");
  },
  lastPost() {
    let last = Articles.findOne({}, { sort: { timestamp: -1 }});
    // console.log(last);
    return moment(last.timestamp).format("DD/MM/YYYY");
  },
  lastUpdate() {
    let lastUp = Articles.findOne({}, { sort: { timestamp: -1 }});
    // console.log(lastUp);
    return moment(lastUp.timestamp).format("HH:mm")
  }
});
