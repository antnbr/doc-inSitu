import { Template } from 'meteor/templating';

import './editor.html';
import { mode } from '../body.js';

Template.editor.events({
  'click #ev_closeEditArticle': () => {
    mode.set("articles");
  },
})
