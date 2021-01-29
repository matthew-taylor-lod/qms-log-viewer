import AlgoStartup from "./AlgoStartup";
import PrePropHistory from "./PrePropHistory";
import React from "react";
import IndividualSession from "./IndividualSession";
import Outcome from "./Outcome";

const parser = new DOMParser();

function AlgoStartupLine(line) {
    const timestamp = line.substring(0, 19);
    const sessionId = line.split(" ")[2];
    const algoId = line.match(/algorithmId=(\d*)/)[1];
    const universeName = line.match(/patientUniverseName=(.*?)}/)[1];
    const productId = line.match(/productId=(\d*)/)[1];

    return <AlgoStartup key={timestamp +"a"}
                        timestamp={timestamp}
                        sessionId={sessionId}
                        algoId={algoId}
                        universeName={universeName}
                        productId={productId}/>;
}

function PrePropHistoryLine(line) {
    const timestamp = line.substring(0, 19);
    const sessionId = line.split(" ")[2];
    const rawData = line.match(/<ns2:Data>(.*)<\/ns2:Data>/)[1];
    const xmlData = parser.parseFromString(rawData, "text/xml").children[0];

    return <PrePropHistory key={timestamp +"b"}
                           timestamp={timestamp}
                           sessionId={sessionId}
                           xmlData={xmlData}/>;
}

function OutcomeLine(line) {
    const timestamp = line.substring(0, 19);
    const sessionId = line.split(" ")[2];
    const rawData = line.match(/\[Request: <(.*),{Cookie=\[S_SESS/)[1];
    const jsonData = JSON.parse(rawData);

    return <Outcome key={timestamp +"c"}
                    timestamp={timestamp}
                    sessionId={sessionId}
                    jsonData={jsonData}/>
}

function ParseLog(text) {
    const lines = text.split("\n");

    const items = lines.map(line => {
        if (line.includes("Starting traversal")) {
            return AlgoStartupLine(line);
        }
        if (line.includes("LloydsPrepopHistoryResponse")) {
            return PrePropHistoryLine(line);
        }
        if (line.includes("OutcomeClient - Service Call REQUEST")) {
            return OutcomeLine(line);
        }
        return null;
    }).filter(el => el);

    const uniqueSessionIds = Array.from(items.reduce((set, item) => set.add(item.props.sessionId), new Set()));
    const itemsBySession = uniqueSessionIds.map(id => items.filter(item => item.props.sessionId === id));

    const individualSessions = [];

    let current = [];

    itemsBySession.forEach(session => {
        session.forEach(item => {
            if (item.type.name === "AlgoStartup" && current.length > 0) {
                individualSessions.push(current);
                current = [];
            }
            current.push(item);
        });
        if (current.length > 0) {
            individualSessions.push(current);
            current = [];
        }
    });

    const output = individualSessions.map(items => {
        if (items.length < 3) return null;

       const algoStartup = items[0];
       const prePropHistory = (items.length >= 2) ? items[1] : null;
       const outcome = (items.length >= 3) ? items[2] : null;
       return <IndividualSession algoStartup={algoStartup}
                                 prePropHistory={prePropHistory}
                                 outcome={outcome}/>
    });

    return output;
}

export default ParseLog;
