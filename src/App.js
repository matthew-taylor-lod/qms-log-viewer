import './App.scss';
import React, {useEffect, useState} from "react";
import ParseLog from "./ParseLog";

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
                setData(ParseLog(text));
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
