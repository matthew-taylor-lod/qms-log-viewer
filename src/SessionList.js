import "./SessionList.scss";
import React from "react";

function SessionList({sessions, selected, setSelected}) {
    const headers = ["Start time", "Algo", "Product", "SKU", "Outcome", "Suitable Response"];
    const headerRow = headers.map(header => <th key={header}>{header}</th>);

    const items = sessions.map(session => <SessionListItem key={session.i}
                                                     selected={selected}
                                                     setSelected={setSelected}
                                                     session={session}/>);

    if (items.length === 0) {
        return null;
    }

    return (
        <div className="SessionList">
            <h1>QMS Log Viewer</h1>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mauris sapien, ultrices nec quam eu, elementum mollis nunc. Curabitur fringilla metus sed sem dapibus fermentum. Pellentesque vitae tortor pulvinar, aliquam eros et, porta neque. Nulla facilisi. Donec mauris nibh, rhoncus quis velit eget, blandit porta mauris. Ut pharetra tincidunt tortor, sit amet bibendum tellus hendrerit sit amet. Sed pellentesque eu ex sed facilisis. Mauris eget odio et tortor viverra porttitor sit amet sed sapien. Vestibulum mi justo, consectetur non dolor et, placerat placerat metus.</p>
            <table>
                <thead>
                    <tr>{headerRow}</tr>
                </thead>
                <tbody>
                    {items}
                </tbody>
            </table>
        </div>
    )
}

function SessionListItem({session, selected, setSelected}) {
    console.log(session);

    const algo = (session.algoStartup.universeName !== "null") ? session.algoStartup.universeName : session.algoStartup.algoId;
    const product = (session.prePropHistory) ? session.prePropHistory.data.confInitialProduct : "???";
    const outcome = (session.outcome) ? session.outcome.data.diagnosisOutcome.diagnosisStatus : "Incomplete";
    const suitableResponse = (session.outcome) ? session.outcome.data.diagnosisOutcome.outcomeScriptData.suitable_response : "";

    const classes = (session.i === selected) ? "SessionListItem selected" : "SessionListItem";

    return <tr className={classes} onClick={() => setSelected(session.i)}>
        <td>{session.algoStartup.timestamp}</td>
        <td>{algo}</td>
        <td>{product}</td>
        <td>{session.algoStartup.productId}</td>
        <td>{outcome}</td>
        <td>{suitableResponse.replaceAll("_", " ").toLowerCase()}</td>
    </tr>
}

export default SessionList;
