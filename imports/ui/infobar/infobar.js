import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';

import './infobar.html';

Template.infobar.helpers({
  time() {
    return moment().locale('fr').format('dddd Do MMMM YYYY');
  }
});
