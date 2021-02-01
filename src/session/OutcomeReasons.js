import React from "react";
import("./OutcomeReasons.scss");

function OutcomeReasons({data}) {

    return (
        <div className="OutcomeReasons">
            { data.admin.length > 0 && <ReasonList title="Admin Reasons:" reasons={data.admin}/> }
            { data.clinical.length > 0 && <ReasonList title="Clinical Reasons:" reasons={data.clinical}/> }
        </div>
    )
}

function ReasonList({title, reasons}) {
    const output = reasons.map(reason => (
       <li key={reason.code}>{reason.text}</li>
    ));
    return (
        <div key={title} className="ReasonList">
            <div className="title">{title}</div>
            <ul>
                {output}
            </ul>
        </div>
    )

}

export default OutcomeReasons;
