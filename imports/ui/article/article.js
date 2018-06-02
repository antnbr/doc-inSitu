import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';

import './article.html';

Template.article.helpers({
  newTimestamp() {
    // console.log(this);
    return moment(this.timestamp).format("DD/MM/YYYY - HH:mm");
  }
});
