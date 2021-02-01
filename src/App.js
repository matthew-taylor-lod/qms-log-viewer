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
        <div>
            <div className="top" onClick={() => setSelected(0)}>
                QMS Log Viewer
            </div>
            <div className="App">
                <div className="inner">
                    {inner}
                </div>
            </div>
        </div>
    );
}

export default App;
