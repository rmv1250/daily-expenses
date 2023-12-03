import {API_PATHS} from "./apiPaths.ts";
import delay from "../utils/delay.ts";
import {ISettingsState} from "../store/settingsSlice.ts";

const settingsApi = async (settings?: ISettingsState, method = 'GET') => {
  await delay(import.meta.env.VITE_API_DELAY);

  const response = await fetch(`${import.meta.env.VITE_API_HOST}/${API_PATHS.SETTINGS}`, {
    method,
    body: JSON.stringify(settings),
    headers: {
      'Content-Type': 'application/json'
    }
  })

  return await response.json();
}


export {settingsApi}