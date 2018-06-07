import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';

import { Articles } from '/imports/api/lists.js';
import { Pictures } from '/imports/api/lists.js';
import './render.html';
import '/imports/ui/article/article.js';
import '/imports/ui/buttons/buttons.js';

Template.render.helpers({
  articles() {
    // console.log(Articles.find({}).fetch());
    return Articles.find({});
  },
  pictures() {
    return Pictures.find({});
  }
});
