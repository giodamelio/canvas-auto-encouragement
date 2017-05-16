// ==UserScript==
// @name         Canvas Auto Encouragement
// @namespace    https://giodamelio.com
// @version      0.1
// @description  Words are hard.
// @author       Gio d'Amelio
// @match        https://canvas.instructure.com/courses/*/gradebook/speed_grader*
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

  // Add the button
  const button_auto = document.createElement('button');
  button_auto.innerHTML = 'Auto Encourage';
  button_auto.className = 'Button Button--small';
  document.getElementById('add_a_comment').appendChild(button_auto);

  // When the user clicks the button copy the commands
  button_auto.onclick = function(e) {
    e.preventDefault();
    const comment_textarea = document.getElementById('speedgrader_comment_textarea');
    comment_textarea.value = random_element(encouragements) + '. ' + comment_textarea.value;
  };

  // Add the button
  const button_auto_extra = document.createElement('button');
  button_auto_extra.innerHTML = 'Auto Encourage!!!';
  button_auto_extra.className = 'Button Button--small';
  document.getElementById('add_a_comment').appendChild(button_auto_extra);

  // When the user clicks the button copy the commands
  button_auto_extra.onclick = function(e) {
    e.preventDefault();
    const comment_textarea = document.getElementById('speedgrader_comment_textarea');
    comment_textarea.value = random_element(encouragements) + '! ' + comment_textarea.value;
  };
})();
