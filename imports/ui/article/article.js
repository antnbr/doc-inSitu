import { Template } from 'meteor/templating';

import { Articles } from '/imports/api/lists.js';
import './article.html';
import '../buttons/buttons.js';

Template.renderArticles.helpers({
  articles() {
    // console.log(Articles.find({}).fetch());
    return Articles.find({});
  }
});
