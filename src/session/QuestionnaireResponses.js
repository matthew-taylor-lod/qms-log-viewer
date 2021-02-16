import "./QuestionnaireResponses.scss";
import React from "react";
import ReactTooltip from "react-tooltip";

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
                                     question={response.question}
                                     questionId={response.questionId}
                                     answer={response.answer}
                                     answerId={response.answerId}
                                     significant={response.significant}/>)
            }

        i++;
    }

    return (
        <div className="QuestionnaireResponses">
            <ReactTooltip place="left" effect="solid" delayShow={250}/>
            <h2>Questionnaire Responses</h2>
            <ol>
                {responses}
            </ol>
            <hr/>
            <div className="center">-- END OF QUESTIONNAIRE --</div>
        </div>
    )
}

function Response({question, questionId, answer, answerId, significant}) {
    const significantClass = (significant) ? "significant" : "";
    return (
        <li className="Response">
            <div className="question" dangerouslySetInnerHTML={{__html: question}} data-tip={"questionId: " + questionId} data-class="questionTooltip"></div>
            <div className={"answer " +significantClass} data-tip={"answerId: "+ answerId} data-class="answerTooltip">
                {answer}
            </div>
        </li>
    )
}

function MultipleChoiceResponse({question, questionId, answer, answerId, significant, choices}) {
    const answers = choices.map(c => {
            const significantClass = (c.significant) ? "significant" : "";
            return <tr key={c.key} data-tip={"answerId: "+ c.answerId} data-class="answerTooltip">
                <td className="question" dangerouslySetInnerHTML={{__html: c.question}}></td>
                <td className={"answer " +significantClass}>{c.answer}</td>
            </tr>
        }
    );
    const significantClass = (significant) ? "significant" : "";
    return (
        <li className="Response" >
            <div className="question" dangerouslySetInnerHTML={{__html: question}} data-tip={"questionId: " + questionId} data-class="questionTooltip"></div>
            <div className={"answer " + significantClass} data-tip={"answerId: "+ answerId} data-class="answerTooltip">{answer}</div>
            <table>
                <tbody>
                    {answers}
                </tbody>
            </table>
        </li>
    )
}

export default QuestionnaireResponses;
