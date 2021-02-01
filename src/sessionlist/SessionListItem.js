import "./SessionListItem.scss";
import React from "react";

function SessionListItem({session, setSelected}) {
    const algo = (session.patientUniverseName !== "null")
        ? session.patientUniverseName
        : session.algorithmId;
    const product = session.prePropHistory?.confInitialProduct;
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
        <tr className="SessionListItem" onClick={() => setSelected(session.i)}>
            <td>{session.startTime}</td>
            <td>{algo}</td>
            <td>{product}</td>
            <td>{session.sku}</td>
            <td className={outcome}>{outcome}</td>
            <td className={outcome}>{suitableResponse}</td>
        </tr>
    )
}

export default SessionListItem;
