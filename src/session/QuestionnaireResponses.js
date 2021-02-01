import "./QuestionnaireResponses.scss";
import React from "react";

function QuestionnaireResponses({data}) {
    if (!data) return "None";
    console.log(data);

    const responses = [];
    let i =0;
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
                choices.push({key: answer.displayOrder, question: answer.question, answer: answer.answer});
                j++;
            }
            responses.push(<MultipleChoiceResponse key={response.displayOrder}
                                                   question={response.question}
                                                   choices={choices}/>)
            i = j;
        }
        else {
            responses.push(<Response key={response.displayOrder}
                                     question={response.question}
                                     answer={response.answer}/>)
            }

        i++;
    }

    return (
        <div className="QuestionnaireResponses">
            <h2>Questions & Answers</h2>
            <ol>
                {responses}
            </ol>
        </div>
    )
}

function Response({question, answer}) {
    return (
        <li className="Response">
            <div className="question" dangerouslySetInnerHTML={{__html: question}}></div>
            <div className="answer" >{answer}</div>
        </li>
    )
}

function MultipleChoiceResponse({question, choices}) {
    const answers = choices.map(c =>
        <tr key={c.key}>
            <td className="question" dangerouslySetInnerHTML={{__html: c.question}}></td>
            <td className="answer">
                {c.answer}
            </td>
        </tr>
    );
    return (
        <li className="Response">
            <div className="question" dangerouslySetInnerHTML={{__html: question}}></div>
            <table>
                <tbody>
                    {answers}
                </tbody>
            </table>
        </li>
    )
}

export default QuestionnaireResponses;
