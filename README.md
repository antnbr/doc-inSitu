# Documentation In Situ

## Descritpion
Ce projet est une application d'écriture collaborative pour une expérience de documentation participative, en temps réel et "in situ" basée sur le framework [Meteor](https://www.meteor.com/)

## Installation
1. Installer Meteor
  - OS X/Linux : `curl https://install.meteor.com/ | sh`
  - Windows : installer [Chocolatey](https://chocolatey.org/install), puis `choco install meteor`

2. Cloner le dépôt et initialiser les modules *node*
  ```
  git clone { adresse https ou ssh }
  cd doc-insitu
  meteor npm install
  ```

3. Prévisualiser le projet
  - Depuis le dossier de l'application, lancer `meteor`
  - Dans un navigateur, rendez vous à l'adresse [](http://localhost:3000)
  OU
  - Si vous voulez personaliser le port d'écoute, lancer `meteor --port monPort`
  - rdv à l'adresse [](http://localhost:monPort)

## To-Do List
+ Articles
  - [x] éditeur d'Articles
  - [ ] Intégrer l'éditeur aux rendu des articles
  - [ ] Layout CSS Grid des articles en fonction du type
  - [ ] Styling en fonction des tags ?

+ Scanner
  - [x] Intégrer Webcam
  - [ ] Enregistrer capture dans "pictures"
  - [ ] Intégrer les images au layout

+ Impression
  - [ ] Vue d'une page sur meteor
  - [ ] Intégrer le code HTML des articles dans la page
