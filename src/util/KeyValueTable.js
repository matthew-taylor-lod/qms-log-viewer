import './KeyValueTable.scss';
import React, {useState} from "react";

function KeyValueTable({data}) {
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
        <div className="KeyValueTable">
            <span>Filter by </span>
            <input placeholder="type here to filter table" onKeyUp={e => {setFilterValue(e.target.value)}}/>
            <span>Showing {showing} of {total}</span>
            <table className="striped">
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

export default KeyValueTable;
