function AlgoStartup({timestamp, sessionId, algoId, universeName, productId}) {

    return (
        <div className="AlgoStartup">
            <h1>
                Starting algo {algoId} ({universeName}) with product {productId}
            </h1>
            <p>{timestamp}</p>
        </div>
    );
}

export default AlgoStartup;
