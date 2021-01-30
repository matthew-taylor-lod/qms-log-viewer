const parser = new DOMParser();

function ParseLog(text) {
    const lines = text.split("\n");

    const items = lines.map(line => {
        if (line.includes("Starting traversal")) {
            return AlgoStartupLine(line);
        }
        if (line.includes("LloydsPrepopHistoryResponse")) {
            return PrePropHistoryLine(line);
        }
        if (line.includes("OutcomeClient - Service Call REQUEST")) {
            return OutcomeLine(line);
        }
        return null;
    }).filter(el => el);

    const uniqueSessionIds = Array.from(items.reduce((set, item) => set.add(item.sessionId), new Set()));
    const itemsBySession = uniqueSessionIds.map(id => items.filter(item => item.sessionId === id));


    // this bit is too fiddly to do with functions
    const individualSessions = [];
    let current = [];
    itemsBySession.forEach(session => {
        session.forEach(item => {
            if (item.type === "AlgoStartup" && current.length > 0) {
                individualSessions.push(current);
                current = [];
            }
            current.push(item);
        });
        if (current.length > 0) {
            individualSessions.push(current);
            current = [];
        }
    });

    // combine the pieces
    const output = individualSessions.reverse().map((items, i) => {
        const algoStartup = items[0];
        const prePropHistory = (items.length >= 2) ? items[1] : null;
        const outcome = (items.length >= 3) ? items[2] : null;
        return {i: i+1, algoStartup: algoStartup, prePropHistory: prePropHistory, outcome: outcome}
    });

    return output.filter(e => e);
}

function AlgoStartupLine(line) {
    const item = {};
    item.type = "AlgoStartup";
    item.timestamp = line.substring(0, 19);
    item.sessionId = line.split(" ")[2];
    item.algoId = line.match(/algorithmId=(\d*)/)[1];
    item.universeName = line.match(/patientUniverseName=(.*?)}/)[1];
    item.productId = line.match(/productId=(\d*)/)[1];

    return item;
}

function PrePropHistoryLine(line) {
    const item = {};
    item.type = "PrePropHistory";
    item.timestamp = line.substring(0, 19);
    item.sessionId = line.split(" ")[2];
    const rawData = line.match(/<ns2:Data>(.*)<\/ns2:Data>/)[1];
    const xmlData = parser.parseFromString(rawData, "text/xml").children[0];

    item.data = {};
    Array.from(xmlData.children).forEach(node => {
        const name = node.getAttribute("Name");
        const value = node.getAttribute("Value");
        item.data[name] = value;
    });

    return item;
}

function OutcomeLine(line) {
    const item = {};
    item.type = "Outcome";
    item.timestamp = line.substring(0, 19);
    item.sessionId = line.split(" ")[2];
    const rawData = line.match(/\[Request: <(.*),{Cookie=\[S_SESS/)[1];
    item.data = JSON.parse(rawData);

    return item;
}

export default ParseLog;
