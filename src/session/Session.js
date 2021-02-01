import './Session.scss';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import React, {useEffect} from "react";
import QuestionnaireResponses from "./QuestionnaireResponses";
import SessionSummary from "./SessionSummary";
import KeyValueTable from "../util/KeyValueTable";

function Session({session}) {
    console.log(session);

    // scroll to top
    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const hasQuestionnaireResponses = session.outcome?.questionnaireResponses !== undefined;
    const hasSilentReasons = session.outcome?.diagnosisOutcome?.reasons !== undefined;
    const hasOutcomeMessages = session.outcome?.diagnosisOutcome?.outcomeMessage !== undefined;
    const hasOutcomeScriptData = session.outcome?.diagnosisOutcome?.outcomeScriptData !== undefined;
    const hasBiometrics = session.outcome?.biometrics !== undefined;
    const hasPrePropHistory = session.prePropHistory !== undefined;

    const silentReasons = session.outcome?.diagnosisOutcome?.reasons?.silent?.map(reason =>
        <li>{reason.text}</li>);

    return (
        <div className="Session">
            <SessionSummary session={session}></SessionSummary>
            <Tabs>
                <TabList>
                    { hasQuestionnaireResponses && <Tab>Questionnaire Responses</Tab>}
                    { hasSilentReasons && <Tab>Silent Reasons</Tab>}
                    { hasBiometrics && <Tab>Biometrics</Tab>}
                    { hasOutcomeScriptData && <Tab>Script Data</Tab>}
                    { hasOutcomeMessages && <Tab>Outcome Messages</Tab>}
                    { hasPrePropHistory && <Tab>PrePop History</Tab>}
                </TabList>

                {
                    hasQuestionnaireResponses &&
                    <TabPanel>
                        <QuestionnaireResponses data={session.outcome.questionnaireResponses}/>
                    </TabPanel>
                }
                {
                    hasSilentReasons &&
                    <TabPanel>
                        <h2>Silent Reasons</h2>
                        <ul>
                            {silentReasons}
                        </ul>
                    </TabPanel>
                }
                {
                    hasBiometrics &&
                    <TabPanel>
                        <KeyValueTable title="Biometrics" data={session.outcome.biometrics}/>
                    </TabPanel>
                }
                {
                    hasOutcomeScriptData &&
                    <TabPanel>
                        <KeyValueTable title="Script Data" data={session.outcome?.diagnosisOutcome?.outcomeScriptData}/>
                    </TabPanel>
                }
                {
                    hasOutcomeMessages &&
                    <TabPanel>
                        <KeyValueTable title="Outcome Messages" data={session.outcome?.diagnosisOutcome?.outcomeMessage}/>
                    </TabPanel>
                }
                {
                    hasPrePropHistory &&
                    <TabPanel>
                        <KeyValueTable title="PreProp History" data={session.prePropHistory}/>
                    </TabPanel>
                }
            </Tabs>
        </div>
    )
}

export default Session;
