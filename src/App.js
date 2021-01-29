import './App.scss';
import React, {useEffect, useState} from "react";
import AlgoStartup from "./AlgoStartup";
import PrepropHistory from "./PrepropHistory";

const parser = new DOMParser();

function App() {
    const [data, setData] = useState([]);
    const getData = () => {
        fetch('sample.log', {
                headers: {
                    'pragma': 'no-cache',
                    'cache-control': 'no-cache'
                }
            })
            .then(function (response) {
                console.log(response)
                return response.text();
            })
            .then(function (text) {
                const lines = text.split("\n");

                const selected = lines.map(line => {
                   if (line.includes("Starting traversal")) {
                       const timestamp = line.substring(0, 19);
                       const sessionId = line.split(" ")[2];
                       const algoId = line.match(/algorithmId=(\d*)/)[1];
                       const universeName = line.match(/patientUniverseName=(.*?)}/)[1];
                       const productId = line.match(/productId=(\d*)/)[1];
                       return <AlgoStartup
                           key={timestamp +"a"}
                           timestamp={timestamp}
                           sessionId={sessionId}
                           algoId={algoId}
                           universeName={universeName}
                           productId={productId}/>
                   }
                   if (line.includes("LloydsPrepopHistoryResponse")) {
                       const timestamp = line.substring(0, 19);
                       const sessionId = line.split(" ")[2];
                       const rawData = line.match(/<ns2:Data>(.*)<\/ns2:Data>/)[1];
                       const xmlData = parser.parseFromString(rawData, "text/xml").children[0];
                       return <PrepropHistory
                           key={timestamp +"b"}
                           timestamp={timestamp}
                           sessionId={sessionId}
                           xmlData={xmlData}/>

                   }
                   return null;
                }).filter(line => line);

                setData(selected);
            });
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="App">
            {data}
        </div>
    );
}

export default App;
