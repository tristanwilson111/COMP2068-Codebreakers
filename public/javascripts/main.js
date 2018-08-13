// adds the spec form to the dom
function addQuestion() {
  let questionTemp = document.querySelector('#survey_question');
  let insertPoint = document.querySelector('#survey_questions');

  let clone = document.importNode(questionTemp.content, true);

  insertPoint.appendChild(clone);
}

// removes the spec form from the dom
function delQuestion(event) {
  event.target.parentNode.remove();
}
