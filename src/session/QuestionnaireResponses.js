import "./QuestionnaireResponses.scss";
import React from "react";

function QuestionnaireResponses({data}) {
    if (!data) return "None";
    console.log(data);

    const responses = [];
    let i = 0;
    let questionNumber = 1;
    while (i < data.length) {
        const response = data[i]

        // multiple choice
        if (response.questionType === 4) {
            const choices = [];
            let j = i + 1;
            while (j < data.length) {
                const answer = data[j];
                if (answer.questionId !== response.questionId) {
                    j--;
                    break;
                }
                choices.push({
                    key: answer.displayOrder,
                    question: answer.question,
                    questionId: answer.questionId,
                    answer: answer.answer,
                    answerId: answer.answerId,
                    significant: answer.significant});
                j++;
            }
            responses.push(<MultipleChoiceResponse key={response.displayOrder}
                                                   number={questionNumber}
                                                   question={response.question}
                                                   questionId={response.questionId}
                                                   answer={response.answer}
                                                   answerId={response.answerId}
                                                   significant={response.significant}
                                                   choices={choices}/>)
            i = j;
        }
        else {
            responses.push(<Response key={response.displayOrder}
                                     number={questionNumber}
                                     question={response.question}
                                     questionId={response.questionId}
                                     answer={response.answer}
                                     answerId={response.answerId}
                                     significant={response.significant}/>)
            }

        i++;
        questionNumber++;
    }

    return (
        <div className="QuestionnaireResponses">
            <h2>Questionnaire Responses</h2>
            <div className="responses">
                {responses}
            </div>
            <hr/>
            <div className="center">-- END OF QUESTIONNAIRE --</div>
        </div>
    )
}

function Response({number, question, questionId, answer, answerId, significant}) {
    const significantClass = (significant) ? "significant" : "";
    return (
        <div className="Response">
            <div className="cell">
                <div className="number">{number}.</div>
                <div className="questionId">questionId: {questionId}</div>
            </div>
            <div className="cell">
                <div className="question" dangerouslySetInnerHTML={{__html: question}}></div>
                <span className="answerId">answerId: {answerId}</span>
                <span className={"answer " + significantClass}>
                    {answer}
                </span>
            </div>
        </div>
    )
}

function MultipleChoiceResponse({number, question, questionId, answer, answerId, significant, choices}) {
    const answers = choices.map(c => {
            const significantClass = (c.significant) ? "significant" : "";
            return <tr key={c.key} data-tip={"answerId: "+ c.answerId} data-class="answerTooltip">
                <td><span className="answerId">answerId: {c.answerId}</span></td>
                <td className="question" dangerouslySetInnerHTML={{__html: c.question}}></td>
                <td className={"answer " + significantClass}>{c.answer}</td>
            </tr>
        }
    );
    const significantClass = (significant) ? "significant" : "";
    return (
        <div className="Response">
            <div className="cell">
                <div className="number">{number}.</div>
                <div className="questionId">questionId: {questionId}</div>
            </div>
            <div className="cell">
                <div className="question" dangerouslySetInnerHTML={{__html: question}}></div>
                {answerId && <>
                    <span className="answerId">answerId: {answerId}</span>
                    <span className={"answer " +significantClass}>
                        {answer}
                    </span>
                    </> }
                <table>
                    <tbody>
                        {answers}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default QuestionnaireResponses;
