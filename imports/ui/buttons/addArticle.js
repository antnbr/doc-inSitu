import { Template } from 'meteor/templating';

import './addArticle.html';
import { mode } from "../body.js"

Template.addArticle.events({
  'click #ev_addArticle': () => {
    mode.set("edit");
  }
});
