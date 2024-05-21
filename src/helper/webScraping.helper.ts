import axios from "axios";
import cheerio from "cheerio";
import Bottleneck from "bottleneck";

const limiter = new Bottleneck({
  minTime: 200, // 5 requests per second
  maxConcurrent: 10, // Max 10 concurrent requests
});

async function fetchExamUpdates(url) {
  try {
    const { data } = await axios.get(url);
    // console.log(data)
    const $ = cheerio.load(data);

    const updates = [];
    $(".result_link_text").each((index, element) => {
      const title = $(element).find(".title").text().trim();
      const date = $(element).find(".date").text().trim();
      let link = $(element).find("a").attr("href");

      // Sanitize the link by encoding spaces and special characters
      link = encodeURI(link);

      updates.push({
        title,
        date,
        link,
      });
    });

    // console.log(updates, "updates");

    return updates;
  } catch (error) {
    console.error(`Failed to fetch updates from ${url}:`, error.message);
    return [];
  }
}

async function fetchAllExamUpdates(urls) {
  console.log(urls)
  const updatePromises = urls.map((url) =>
    limiter.schedule(() => fetchExamUpdates(url)),
  );
  const results = await Promise.all(updatePromises);
  return results.flat(); // Flatten the array of arrays
}

export { fetchAllExamUpdates };
