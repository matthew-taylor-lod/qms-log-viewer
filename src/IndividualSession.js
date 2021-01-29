import './IndividualSession.scss';

function IndividualSession({algoStartup, prePropHistory, outcome}) {
    return (
        <div className="IndividualSession">
            {algoStartup}
            {prePropHistory}
            {outcome}
        </div>
    )
}

export default IndividualSession;
