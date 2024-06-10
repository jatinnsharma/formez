import { fetchAllExamUpdates } from "./fetchUniExamResults";

async function webscaping() {
  const data = await fetchAllExamUpdates();

  // console.log(data);
  return data;
}

export { webscaping };
