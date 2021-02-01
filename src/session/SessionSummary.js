import './SessionSummary.scss';
import OutcomeReasons from "./OutcomeReasons";

function SessionSummary({session}) {

    const title = (session.prePropHistory && session.prePropHistory.confInitialProduct)
        ? session.prePropHistory.confInitialProduct
        : "Product " + session.sku;

    const packSize = (session.prePropHistory && session.prePropHistory.confInitialPackSize)
        ? " - pack size " + session.prePropHistory.confInitialPackSize
        : "";

    const outcome = (session.outcome)
        ? session.outcome.diagnosisOutcome.diagnosisStatus
        : "INCOMPLETE";

    const changedSku = (session.outcome && Number(session.sku) !== session.outcome.sku);

    let suitableResponse;
    if (changedSku) {
        suitableResponse = "Product SKU changed to " + session.outcome.sku;
    }
    if (outcome === "REJECTED") {
        suitableResponse = session.outcome.diagnosisOutcome.outcomeScriptData.suitable_response.replaceAll("_", " ");
    }

    return (
        <div className="SessionSummary">
            <div className="two-col">
                <div className="title">
                    <h1>{title + packSize}</h1>
                </div>
                <div className="outcomeContainer right right-col">
                    <p className={"outcome h1 " + outcome}>{outcome}</p>
                    <p className={"suitableResponse " + outcome}>{suitableResponse}</p>
                </div>
            </div>
            <div className="two-col">
                <div>
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
                            {changedSku && <tr>
                                <td>Final SKU</td>
                                <td>{session.outcome.sku}</td>
                            </tr>
                            }
                        </tbody>
                    </table>
                </div>
                <div className="right-col">
                    { session.outcome?.diagnosisOutcome?.reasons && <OutcomeReasons data={session.outcome.diagnosisOutcome.reasons}/> }
                </div>
            </div>
        </div>
    )
}

export default SessionSummary;
