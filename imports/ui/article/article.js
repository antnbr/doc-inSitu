import { Template } from 'meteor/templating';

import { Articles } from '/imports/api/lists.js';
import './article.html';

Template.renderArticles.helpers({
  articles() {
    return Articles.find({});
  }
});
