import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';;

// --- Lists declarations --- //
export const Articles = new Mongo.Collection('articles');

// --- Globally used functions --- //
export function getFrDate() {
  var d = new Date();
  var jours = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
  var mois = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
              "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
  // ---------------------------------------------------------------------------------------------- //
  var date = jours[d.getDay()] + " " + d.getDate() + " " + mois[d.getMonth()] + " " + d.getFullYear();
  // console.log(date);
  return date;
}

// --- set methods & publishing rights --- //
if (Meteor.isServer) {
  // This code only runs on the server
  // Allow publication of 'articles'
  Meteor.publish('articles', () => {
    return Articles.find({});
  });

  Meteor.methods({
    'articles.insert': (title, text, username) => {
      check(title, String);
      check(text, String);
      check(username, String);

      Articles.insert({
        title,
        text,
        username,
        createdAt: getFrDate() // current time
      });
    }
  });
}
