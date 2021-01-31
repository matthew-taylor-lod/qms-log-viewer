import "./SessionList.scss";
import React from "react";
import SessionListItem from "./SessionListItem";

function SessionList({sessions, setSelected}) {
    const headers = ["Start time", "Algo", "Product", "SKU", "Outcome", "Suitable Response"];
    const headerRow = headers.map(header => <th key={header}>{header}</th>);

    const items = sessions.map(session => <SessionListItem key={session.i}
                                                           setSelected={setSelected}
                                                           session={session}/>);

    if (items.length === 0) {
        return <div className="SessionList"></div>;
    }

    return (
        <div className="SessionList">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mauris sapien, ultrices nec quam eu, elementum mollis nunc. Curabitur fringilla metus sed sem dapibus fermentum. Pellentesque vitae tortor pulvinar, aliquam eros et, porta neque. Nulla facilisi. Donec mauris nibh, rhoncus quis velit eget, blandit porta mauris. Ut pharetra tincidunt tortor, sit amet bibendum tellus hendrerit sit amet. Sed pellentesque eu ex sed facilisis. Mauris eget odio et tortor viverra porttitor sit amet sed sapien. Vestibulum mi justo, consectetur non dolor et, placerat placerat metus.</p>
            <table className="striped">
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

export default SessionList;
