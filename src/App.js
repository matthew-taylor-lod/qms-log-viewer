import './App.scss';
import React, {useEffect, useState} from "react";
import {
    BrowserRouter,
    Switch,
    Route
} from "react-router-dom";
import ParseLog from "./util/ParseLog";
import Session from "./session/Session";
import SessionList from "./sessionlist/SessionList";
import {useHistory} from "react-router";

function App() {
    const { push } = useHistory();
    const [data, setData] = useState([]);

    const getData = () => {
        const path = "/sample.log";
        fetch(path, {
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
        getData();
        // eslint-disable-next-line
    }, []);

    function getSessionByIndex(i) {
        return data.filter(e => e.i === i)[0];
    }

    return (
        <>
            <div className="top" onClick={() => push("/")}>
                QMS Log Viewer
            </div>
            <div className="App">
                <div className="inner">
                    <Switch>
                        <Route exact path="/">
                            <SessionList sessions={data}/>
                        </Route>
                        <Route exact path="/today/:index" render={props => {
                            const session = getSessionByIndex(Number(props.match.params.index));
                            return <Session session={session}/>
                        }} />
                    </Switch>
                </div>
            </div>
        </>
    );
}

export default App;
