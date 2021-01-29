function AlgoStartup({timestamp, sessionId, algoId, universeName, productId}) {

    return (
        <div className="AlgoStartup">
            <h2>
                Starting algo {algoId} ({universeName}) with product {productId}
            </h2>
            <p>{timestamp}</p>
        </div>
    );
}

export default AlgoStartup;