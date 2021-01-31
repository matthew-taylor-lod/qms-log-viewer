import './App.scss';
import React, {useEffect, useState} from "react";
import ParseLog from "./util/ParseLog";
import Session from "./session/Session";
import SessionList from "./session/list/SessionList";

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

    const inner = (selected)
        ? <Session session={getSessionByIndex(selected)}/>
        : <SessionList sessions={data}
                       setSelected={setSelected}/>;

    return (
        <div className="App">
            <div className="top">
                <div className="container">
                    <h1 onClick={() => setSelected(0)}>
                        QMS Log Viewer
                    </h1>
                </div>
            </div>
            <div className="container">
                {inner}
            </div>
        </div>
    );
}

export default App;
