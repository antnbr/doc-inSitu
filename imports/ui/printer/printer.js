import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import { Articles } from '/imports/api/lists.js';
import './printer.html';

let pageCounter = 0;

Template.printer.helpers({
  pages() {
    return Articles.find({});
  }
});

Template.page.helpers({
  pNumber() {
    pageCounter += 1;
    return pageCounter;
  }
});

Template.printer.events({
  'click #ev_print': (ev, inst) => {
    function printDiv(divName) {
      let elt = document.getElementById(divName);
      let printContent = elt.innerHTML;
      let origin = document.body.innerHTML;

      let doc = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Print</title>
            <link rel='stylesheet' href='/css/print.css' />
          </head>
          <body>
            DATA
          </body>
        </html>
      `.replace("DATA", printContent)

      document.body.innerHTML = doc;
      window.print();
      document.body.innerHTML = origin;
    }

    printDiv("pages");
  }
})
