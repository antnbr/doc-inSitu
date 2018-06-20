// --- packages --- //
import { Template } from 'meteor/templating';
import { moment } from 'meteor/momentjs:moment';
// --- api and html --- //
import { Articles } from '/imports/api/lists.js';
import { Pictures } from '/imports/api/lists.js';
import { mode } from '/imports/ui/body.js';
import './render.html';
// --- ui components --- //
import '/imports/ui/article/article.js';
import '/imports/ui/buttons/buttons.js';

Template.render.helpers({
  noArticles() {
    return Articles.find().count() === 0;
  },

  articles() {
    // console.log(Articles.find({}).fetch());
    return Articles.find({});
  },
  pictures() {
    return Pictures.find({});
  }
});

Template.render.events({
  // drag and drop articles ?
  'click #ev_newArticle': (ev, inst) => {
    mode.set("edit");
  }
})
