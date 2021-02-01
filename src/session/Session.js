import './Session.scss';
import React, {useEffect} from "react";
import QuestionnaireResponses from "./QuestionnaireResponses";

function Session({session}) {
    console.log(session);

    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const title = (session.prePropHistory && session.prePropHistory.confInitialProduct)
        ? session.prePropHistory.confInitialProduct
        : "Product " + session.sku;

    const packSize = (session.prePropHistory && session.prePropHistory.confInitialPackSize)
        ? " - pack size " + session.prePropHistory.confInitialPackSize
        : "";

    const outcome = (session.outcome)
        ? session.outcome.diagnosisOutcome.diagnosisStatus
        : "INCOMPLETE";

    let suitableResponse;
    if (outcome === "REJECTED") {
        suitableResponse = session.outcome.diagnosisOutcome.outcomeScriptData.suitable_response.replaceAll("_", " ");
    }

    return (
        <div className="Session">
            <div className="summary">
                <div className="title">
                    <h1>{title + packSize}</h1>
                </div>
                <div className="outcomeContainer right">
                    <p className={"outcome h1 " + outcome}>{outcome}</p>
                    <p className={"suitableResponse " + outcome}>{suitableResponse}</p>
                </div>
            </div>
            <table className="infoTable">
                <tbody>
                    <tr>
                        <td>Start Time</td>
                        <td>{session.startTime}</td>
                    </tr>
                    {
                        session.completionTime && <tr>
                            <td>Completion Time</td>
                            <td>{session.completionTime}</td>
                        </tr>
                    }
                    <tr>
                        <td>Patient Universe</td>
                        <td>{session.patientUniverseName}</td>
                    </tr>
                    <tr>
                        <td>Algo ID</td>
                        <td>{session.algorithmId}</td>
                    </tr>
                    <tr>
                        <td>SKU</td>
                        <td>{session.sku}</td>
                    </tr>

                </tbody>
            </table>

            <QuestionnaireResponses data={session.outcome?.questionnaireResponses}/>
        </div>
    )
}

export default Session;
