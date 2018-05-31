import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';

import { Articles } from '/imports/api/lists.js';
import { Pictures } from '/imports/api/lists.js';
import './render.html';
import '../buttons/buttons.js';

Template.render.helpers({
  articles() {
    // console.log(Articles.find({}).fetch());
    return Articles.find({});
  },
  pictures() {
    return Pictures.find({});
  }
});

Template.article.helpers({
  newTimestamp() {
    // console.log(this);
    return moment(this.timestamp).format("DD/MM/YYYY - HH:mm");
  }
});
