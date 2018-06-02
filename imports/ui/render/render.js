import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';

import { Articles } from '/imports/api/lists.js';
import { Pictures } from '/imports/api/lists.js';
import './render.html';
import '../article/article.js';
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
