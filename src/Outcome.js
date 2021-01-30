import "./Outcome.scss";

function Outcome({data}) {
    console.log(data);

    return (
        <div className="Outcome">
            <h2>Outcome: {data.diagnosisOutcome.diagnosisStatus}</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Suitable Response</td>
                        <td>{data.diagnosisOutcome.outcomeScriptData.suitable_response}</td>
                    </tr>
                    <tr>
                        <td>Algorithm</td>
                        <td>{data.algoName}</td>
                    </tr>
                    <tr>
                        <td>Product SKU</td>
                        <td>{data.sku}</td>
                    </tr>
                    <tr>
                        <td>Patient Id</td>
                        <td>{data.patientId}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Outcome;
