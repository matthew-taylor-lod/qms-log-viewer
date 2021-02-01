import './KeyValueTable.scss';
import React, {useState} from "react";

function KeyValueTable({title, data}) {
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
            <h2>{title}</h2>
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
        <tr key={name}>
            <td>{name}</td>
            <td dangerouslySetInnerHTML={{__html: value}}></td>
        </tr>
    )
}

function EmptyRow() {
    return (
        <tr key="whatever">
            <td className="center" colSpan={2}>No matching data</td>
        </tr>
    )
}

export default KeyValueTable;
