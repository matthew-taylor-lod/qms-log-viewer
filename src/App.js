import './App.scss';
import React, {useEffect, useState} from "react";
import {
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

    const defaultPath = (process.env.NODE_ENV === 'production') ? "../debug.eh-consultation-questionnaire-web.log" : "sample.log";

    const getData = () => {
        fetch(defaultPath, {
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

    function getSessionById(id) {
        const i = Number(id);
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
                        <Route exact path="/" render={props => {
                            const params = new URLSearchParams(props.location.search);

                            if (params.has("id")) {
                                const session = getSessionById(params.get("id"));
                                if (session) {
                                    return <Session session={session}/>
                                }
                            }
                            // fallback
                            return <SessionList sessions={data}/>
                        }} />
                    </Switch>
                </div>
            </div>
        </>
    );
}

export default App;
