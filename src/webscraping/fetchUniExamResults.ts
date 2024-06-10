import Bottleneck from "bottleneck";
import { KUK_RESULTS_URI, PU_RESULTS_URI } from "../utils";
import { fetchKukExamUpdates, fetchPuExamResults } from "../helper";

const limiter = new Bottleneck({
  minTime: 200,
  maxConcurrent: 10,
});

async function fetchAllExamUpdates() {
  const kukResultsUpdate = await fetchKukExamUpdates(KUK_RESULTS_URI);
  const puResultsUpdate = await fetchPuExamResults(PU_RESULTS_URI);

  const resultsUpdate = [
    {
      kuk: kukResultsUpdate,
      pu: puResultsUpdate,
    },
  ];

  return resultsUpdate;
}

export { fetchAllExamUpdates };
