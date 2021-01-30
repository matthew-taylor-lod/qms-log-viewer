import './Session.scss';
import React from "react";
import PrePropHistory from "./PrePropHistory";
import Outcome from "./Outcome";

function Session({session}) {
    console.log(session);
    const prePropHistory = (session.prePropHistory) ? <PrePropHistory data={session.prePropHistory.data}/> : null;
    const outcome = (session.outcome) ? <Outcome data={session.outcome.data}/> : null;
    return (
        <div className="Session">
            <h1>Session Details</h1>
            {prePropHistory}
            {outcome}
        </div>
    )
}

export default Session;
