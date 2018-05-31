import { Template } from 'meteor/templating';

import { Articles } from '/imports/api/lists.js';
import './printer.html';

Template.printer.helpers({
  pages() {
    console.log(Articles.find({}).fetch());
    return Articles.find({});
  }
});
