import { Meteor } from 'meteor/meteor';

import { Articles } from '/imports/api/lists.js';
import '/imports/api/methods.js';

if (Meteor.isServer) {
  // console.log(Articles.find({}).count());
  let example = {
    articleType: "description",
    title: "Exemple d'article",
    text: "Bonjour ! Ce poste est dédié à votre parole de visiteur et/ou participant ! Vous pouvez écrire quelque lignes sur ce que vous avez fait, ressenti, entendu, envie de faire pendant ou après l'événement 'La Place Bricole'. Qu'il s'agisse d'une histoire, d'une description, d'un avis ou d'une simple humeur. Devenez alors notre journaliste le temps d'un moment convivial ! Il suffit simplement de cliquer sur 'Ajouter un article'. Si vous préférez l'écriture manuelle, pas de soucis ! Ecrivez le sur un papier et revenez le poster en cliquant sur 'Scanner un article !'. A bientôt et au plaisir de se croiser sur La Place Boivin !",
    authname: "L'équipe du W.O.W.",
    authinfo: "un groupe de joyeux bricoleurs...",
  };

  if (Articles.find({}).count() === 0) {
    Meteor.call('insertArticle', example);
  }
}
