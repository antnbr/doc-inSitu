import { Template } from 'meteor/templating';

import { Articles } from '/imports/api/lists.js';
import './article.html';

Template.renderArticles.helpers({
  articles() {
    // console.log(Articles.find({}).fetch());
    return Articles.find({});
  }
});
