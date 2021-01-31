import "./QuestionnaireResponses.scss";

function QuestionnaireResponses({data}) {
    if (!data) return "None";

    // combine multiple choice answers
    const copy = [...data];
    const combined = [];
    let previous = copy.shift();
    while(copy.length > 0) {
        let current = copy.shift();
        if (previous.questionType === 4 && current.questionType === 4 && previous.questionId === current.questionId) {
            previous.answer += (current.question + ":" + current.answer) +"<br>";
        }
        else {
            combined.push(previous);
            previous = current;
        }
    }

    const responses = combined.map(e => <Response key={e.displayOrder}
                                           number={e.displayOrder}
                                           question={e.question}
                                           answer={e.answer}/>
    );

    return (
        <div className="QuestionnaireResponses">
            {responses}
        </div>
    )
}

function Response({number, question, answer}) {
    return (
        <div className="Response">
            <div className="question" dangerouslySetInnerHTML={{__html: question}}></div>
            <div className="answer" >{answer}</div>
        </div>
    )
}

export default QuestionnaireResponses;