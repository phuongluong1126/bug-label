const URL = "http://127.0.0.1:5000";
export const fetchBugReports = () => fetch(`${URL}/getall`).then(res => res.json());
export const addNewBugReport = (data) => fetch(`${URL}/create?title=${data.title}&content=${data.content}`);