import React, {useEffect, useState}from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
    const [questions, setQuestions] = useState([]);

  useEffect (()=>{
    fetch("http://localhost:4000/questions")
    .then(r => r.json())
    .then(data => setQuestions(data));
  }, []);
  console.log(questions)
  function handleUpdateDelete(deleted){
    const posting={method:"DELETE"}
    fetch(`http://localhost:4000/questions${deleted.id}`, posting)
    .then(r=>r.json())
    .then(()=>setQuestions(questions=>questions.filter(prompts=>prompts.id !== deleted.id)))
  }
  function onAnswerChange(question, e){
    const posting={
      method:"PATCH",
      header:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({...question, correctIndex:e.target.value})
    }
    fetch(`http://localhost:4000/questions/${question.id}`, posting)
    .then(r=>r.json())
    .then(question=>console.log(question))
  }

  const prompts = questions.map(prompts=>{
    return <QuestionItem onAnswerChange={onAnswerChange} onDelete= {handleUpdateDelete}question={prompts}key={prompts.id}/>
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{prompts}</ul>
    </section>
  );
}

export default QuestionList;
