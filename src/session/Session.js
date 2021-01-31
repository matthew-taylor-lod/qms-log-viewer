import './Session.scss';
import React from "react";

function Session({session}) {
    console.log(session);

    const title = (session.prePropHistory)
        ? session.prePropHistory.confInitialProduct
        : "Product";

    const outcome = (session.outcome)
        ? session.outcome.diagnosisOutcome.diagnosisStatus
        : "INCOMPLETE";

    const outcomeCss = "outcome " + outcome;

    const suitableResponse = session.outcome?.diagnosisOutcome.outcomeScriptData.suitable_response.replaceAll("_", " ");


    return (
        <div className="Session">
            <h1>{title}</h1>
            <div className="information">
                <table>
                    <tbody>
                        {session.prePropHistory && <tr>
                            <td>
                                Pack Size
                            </td>
                            <td>
                                {session.prePropHistory.confInitialPackSize}
                            </td>
                        </tr>}
                        <tr>
                            <td>SKU</td>
                            <td>{session.sku}</td>
                        </tr>
                        <tr>
                            <td>Algo ID</td>
                            <td>{session.algorithmId}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="outcomeContainer">
                <p className={outcomeCss}>{outcome}</p>
                <p className={suitableResponse}>{suitableResponse}</p>
            </div>
        </div>
    );
/*
    const overview = {};
    overview["Start Time"] = session.startTime;
    overview["Product"] = session.prePropHistory?.confInitialProduct;
    overview["Patient Universe"] = session.patientUniverseName;

    overview["SKU"] = session.sku;
    overview["algorithmId"] = session.algorithmId;

    if (session.outcome) {
        overview["Completion Time"] = session.completionTime;
        overview["Outcome"] = session.outcome?.diagnosisOutcome.diagnosisStatus;
        overview["Suitable Response"] = session.outcome?.diagnosisOutcome.outcomeScriptData.suitable_response;
    }
    else {
        overview["Outcome"] = "Incomplete";
    }

    const prePropHistory = (session.prePropHistory) ? <KeyValueTable data={session.prePropHistory}/> : "None";
*
    return (
        <div className="Session">
            <h1>Session Details</h1>
            <KeyValueTable data={overview}/>
            <h2>Questions & Answers</h2>
            <QuestionnaireResponses data={session.outcome?.questionnaireResponses}/>
            <KeyValueTable data={overview}/>
            <h2>PrePop History</h2>
            {prePropHistory}
        </div>
    )
*/
}

export default Session;
