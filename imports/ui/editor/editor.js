import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

// --- api and html --- //
import './editor.html';
import '/imports/api/methods.js';
import { Tags } from '/imports/api/lists.js';
import { Authors } from '/imports/api/lists.js';
import { isSelected } from '/imports/ui/buttons/buttons.js';
// --- ui and components --- //
import { mode } from '/imports/ui/body.js';
import { maxLengths } from '/imports/api/lists.js';
import '/imports/ui/buttons/buttons.js';
import '/imports/ui/editor/textChoice.js';
import '/imports/ui/editor/tagsSystem.js';

function autoExpand(target) {
  target.style.cssText = 'height: auto; padding: 0;';
  target.style.cssText = 'height:' + target.scrollHeight + 'px';
}

// --- sets Reactive Vars to check if form is fulfilled --- //
Template.editor.onCreated(function() {
  this.titleIsValid = new ReactiveVar(true);
  this.textIsValid = new ReactiveVar(true);
  this.authorIsValid = new ReactiveVar(true);
});

Template.editor.helpers({
  // Recative Vars settings
  titleIsValid() {
    return Template.instance().titleIsValid.get();
  },
  textIsValid() {
    return Template.instance().textIsValid.get();
  },
  authorIsValid() {
    return Template.instance().authorIsValid.get();
  },
  max(inputName) {
    return maxLengths[inputName];
  },

  // tags and authors settings
  tags() {
    return Tags.find({});
  },
  authors() {
    return Authors.find({});
  }
});

// --- EVENTS --- //
Template.editor.events({
  'keydown textarea': (ev) => {
    autoExpand(ev.target);
  },
  'paste textarea': (ev) => {
    autoExpand(ev.target);
  },

  'submit #editorForm': (ev, inst) => {
    // prevent 'submit' default behavior
    ev.preventDefault();

    const t = ev.target
    console.log(t);
    const title = t.title.value.trim();
    const text = t.text.value.trim();
    const author = t.author.value;

    const allTags = inst.findAll("input[type='checkbox'].tag");
    var tags = [];
    allTags.forEach((tag) => {
      if(tag.checked) tags.push(tag.id);
    });
    console.log(tags);

    // reset reactive-var states
    inst.titleIsValid.set(true);
    inst.authorIsValid.set(true);
    inst.textIsValid.set(true);

    // checks if all fields are filled before collecting data
    if (title === '') inst.titleIsValid.set(false);
    if (text === '') inst.textIsValid.set(false);
    if (author === '') inst.authnameIsValid.set(false);

    // --> load article
    if (title !== '' && text !== '' && author !== '') {
      let article = {
        title: title,
        text: text,
        tags: tags,
        author: author
      };

      Meteor.call('insertArticle', article);
      mode.set("render");
      isSelected.set("render")
;    }
  },

  'submit #newTag': (ev, inst) => {
    ev.preventDefault();
    const t = ev.target;
    let tag = t.tag.value.trim();

    Meteor.call('newTag', tag);
    t.tag.value = '';
  },

  'submit #newAuthor': (ev, inst) => {
    ev.preventDefault();
    const t = ev.target;
    const author = t.author.value.trim();

    Meteor.call('newAuthor', author);
    t.author.value = '';
  }
});
