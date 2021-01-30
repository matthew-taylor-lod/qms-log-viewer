import './App.scss';
import React, {useEffect, useState} from "react";
import ParseLog from "./ParseLog";
import Session from "./Session";
import SessionList from "./SessionList";

function App() {
    const [data, setData] = useState([]);

    const [selected, setSelected] = useState(null);

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
                //setSelected(1);
            });
    }

    useEffect(() => {
        getData()
    }, []);

    function getSessionByIndex(i) {
        return data.filter(e => e.i === i)[0];
    }

    const inner = (selected) ? <Session session={getSessionByIndex(selected)}/> : <SessionList sessions={data} selected={selected} setSelected={setSelected}/>;

    return (
        <div className="App">
            {inner}
        </div>
    );
}

export default App;
