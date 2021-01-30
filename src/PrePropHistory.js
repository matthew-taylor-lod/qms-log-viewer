import './PrePropHistory.scss';
import React, {useState} from "react";

function PrePropHistory({data}) {
    const [filterValue, setFilterValue] = useState("");


    const filteredRows = Object.keys(data).map(k => {
        const v = data[k];
        if ((k+v).toUpperCase().includes(filterValue.toUpperCase())) {
            return <Row key={k} name={k} value={v}/>
        }
        else {
            return null;
        }
    }).filter(e => e);

    const rows = (filteredRows.length > 0) ? filteredRows : <EmptyRow/>

    const showing = filteredRows.length;
    const total = Object.keys(data).length;

    return (
        <div className="PrePropHistory">
            <h3>PrePop History</h3>
            <span>Filter by </span>
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
