import React from "react";

function QuestionItem({ question, onDelete, onAnswerChange}) {
  const { id, prompt, answers, correctIndex } = question;
  

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));
 //delete on server and list
  function handleDelete(){
onDelete(question)

  }
  function handleChange(e){
    onAnswerChange(question, e)
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleChange}defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
