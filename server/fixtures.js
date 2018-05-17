import { Meteor } from 'meteor/meteor';

import { Articles } from '/imports/api/lists.js';

if (Meteor.isServer) {
  // console.log(Articles.find({}).count());
  if (Articles.find({}).count() === 0) {
    Meteor.call('articles.insert',
      "Exemple d'article",
      "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      "Charlie",
      "A un pull rayé blanc et rouge..."
    );
  }
}
