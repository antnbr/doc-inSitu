import { Template } from 'meteor/templating';

import { getFrDate } from '/imports/api/lists.js';
import './infobar.html';

Template.infobar.helpers({
  'time': () => {
    return getFrDate();
  }
});
