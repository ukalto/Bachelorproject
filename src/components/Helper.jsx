import data from "../assets/data.json";

export function getScenario(details, type) {
    const systemDetails = data.data.find(item => item.name === details);
    if (systemDetails) {
        const scenarioItem = systemDetails.details.find(item => item.type === type);
        if (scenarioItem) {
            return scenarioItem.content;
        }
    }
    return "";
}
