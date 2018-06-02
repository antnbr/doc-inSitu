import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Articles } from '/imports/api/lists.js';
import './printer.html';

let pageCounter = 0;

Template.printer.helpers({
  pages() {
    return Articles.find({});
  }
});

Template.page.helpers({
  pNumber() {
    pageCounter += 1;
    return pageCounter;
  }
});
