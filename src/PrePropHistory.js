import './PrePropHistory.scss';
import React, {useState} from "react";

function PrePropHistory({timestamp, sessionId, xmlData}) {
    const [filterValue, setFilterValue] = useState("");

    const filteredRows = Array.from(xmlData.children).map(node => {
       const name = node.getAttribute("Name");
       const value = node.getAttribute("Value");
       if (name && (name + value).toUpperCase().includes(filterValue.toUpperCase())) {
           return <Row key={name}
                       name={name}
                       value={value}/>
       }
       else {
           return null;
       }
    }).filter(e => e);

    const rows = (filteredRows.length > 0) ? filteredRows : <EmptyRow/>

    const showing = filteredRows.length;
    const total = xmlData.children.length;

    return (
        <div className="PrePropHistory">
            <h3>PrePop History</h3>
            <input placeholder="type here to filter table" onKeyUp={e => {setFilterValue(e.target.value)}}/>
            <span>Showing {showing} of {total}</span>
            <table>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );
}

function Row({name, value}) {
    return (
        <tr>
            <td>{name}</td>
            <td>{value}</td>
        </tr>
    )
}

function EmptyRow() {
    return (
        <tr>
            <td colSpan={2}></td>
        </tr>
    )
}

export default PrePropHistory;
