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
    const [data, setData] = useState(undefined);

    const defaultPath = (process.env.NODE_ENV === 'production') ? "../debug.eh-consultation-questionnaire-web.log" : "sample.log";

    const getData = () => {

        function callback () {
            setData(ParseLog(this.responseText));
        }

        const request = new XMLHttpRequest();
        request.addEventListener("load", callback);
        request.open("GET", defaultPath);
        request.send();
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
                    {data === undefined
                        ? <div className="loading">
                            <img src={process.env.PUBLIC_URL + '/loading.gif'} alt="Loading."/>
                            <p>Loading latest log events.</p>
                        </div>
                        : <Switch>
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
                            }}/>
                            }
                        </Switch>
                    }
                </div>
            </div>
        </>
    );
}

export default App;
