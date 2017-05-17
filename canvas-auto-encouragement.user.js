// ==UserScript==
// @name         Canvas Auto Encouragement
// @namespace    https://giodamelio.com
// @version      0.1
// @description  Words are hard.
// @author       Gio d'Amelio
// @match        https://canvas.instructure.com/courses/*/gradebook/speed_grader*
// @require      https://code.jquery.com/jquery-3.2.1.min.js
// @grant        none
// ==/UserScript==

(function() {
  'use strict';

  // Get a random element from an array
  function random_element(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  // Our encouragements
  const encouragements = [
    'Great job',
    'Looking good',
  ];

  // Add a button after the comment field.
  // The first callback should return the encouragement to add to the comment box.
  // The second determines weather it should replace the first sentence of the comment box.
  const comment_text_area = $('#speedgrader_comment_textarea');
  function addEncourageButton(text, generateEncouragementCallback, shouldReplaceCallback) {
    const button = $('<button>', { class: 'Button Button--small', text: text });
    button.click(function(e) {
      e.preventDefault();
      const comment_val = comment_text_area.val();
      const encouragementToAdd = generateEncouragementCallback();
      const shouldReplace = shouldReplaceCallback(comment_val);

      if (shouldReplace) {
        // Delete until first space
        const withoutFirstSentence = comment_val.replace(new RegExp(/([A-Za-z ]+[!\.] )(.+)/), '$2');

        // If the encouragement is all there is, replace it. Otherwise replace it an add back the rest of the comment.
        if (comment_val === withoutFirstSentence) {
          comment_text_area.val(encouragementToAdd + ' ');
        } else {
          comment_text_area.val(encouragementToAdd + ' ' + withoutFirstSentence);
        }
      } else {
        comment_text_area.val(encouragementToAdd + ' ' + comment_val);
      }
    });
    $('#add_a_comment').after(button);
  }

  addEncourageButton(
    'Auto Encourage',
    () => random_element(encouragements) + '.',
    (text) => encouragements.some((e) => text.startsWith(e)),
  );

  addEncourageButton(
    'Auto Encourage!!!',
    () => random_element(encouragements) + '!',
    (text) => encouragements.some((e) => text.startsWith(e)),
  );
})();
