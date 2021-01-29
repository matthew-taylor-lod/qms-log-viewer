import "./Outcome.scss";

function Outcome({timestamp, sessionId, jsonData}) {
    console.log(jsonData);

    return (
        <div className="Outcome">
            <h2>Outcome: {jsonData.diagnosisOutcome.diagnosisStatus}</h2>
            <p>{timestamp}</p>
            <table>
                <tbody>
                    <tr>
                        <td>Suitable Response</td>
                        <td>{jsonData.diagnosisOutcome.outcomeScriptData.suitable_response}</td>
                    </tr>
                    <tr>
                        <td>Algorithm</td>
                        <td>{jsonData.algoName}</td>
                    </tr>
                    <tr>
                        <td>Product SKU</td>
                        <td>{jsonData.sku}</td>
                    </tr>
                    <tr>
                        <td>Patient Id</td>
                        <td>{jsonData.patientId}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default Outcome;
