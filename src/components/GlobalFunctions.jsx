import data from "../assets/data.json";
import {toast} from "react-toastify";

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

export function createToastError(message, position = toast.POSITION.BOTTOM_CENTER) {
    return toast.error(message, {
        position: position,
        closeOnClick: true,
        autoClose: 4000,
        hideProgressBar: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
    });
}
