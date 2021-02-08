import "./SessionListItem.scss";
import React from "react";
import {useHistory} from "react-router";

function SessionListItem({session}) {
    const { push } = useHistory();

    const algo = (session.patientUniverseName !== "")
        ? session.patientUniverseName
        : session.algorithmId;
    const product = (session.prePropHistory?.confInitialProduct)
        ? session.prePropHistory.confInitialProduct
        : "Product " + session.sku;
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
        <tr className="SessionListItem" onClick={() => push("/?id=" + session.i)}>
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
