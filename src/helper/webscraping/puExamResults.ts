// import axios from "axios";
// import cheerio from "cheerio";

// async function fetchPuExamResults(url) {
//   try {
//     const { data } = await axios.get(url);
//     // console.log(url, "usrl ");
//     const $ = cheerio.load(data);

//     const updates = [];

//     $(
//       '[class*="result"], [class*="cp_current_year_exam_result_list"], [class*="update"], .exam-item, .exam-list-item, tr',
//     ).each((index, element) => {
//       let date = $(element).find("td").first().text().trim();

//       // Extract exam name and date from link text
//       $(element)
//         .find("a")
//         .each((i, el) => {
//           const title = $(el).text().trim();
//           const link = $(el).attr("href");

//           // Sanitize the link by encoding spaces and special characters
//           const sanitizedLink = encodeURI(link);

//           updates.push({
//             title,
//             date,
//             link: url + sanitizedLink,
//           });
//         });
//     });

//     return updates;
//   } catch (error) {
//     console.error("Error fetching results:", error);
//   }
// }

// export { fetchPuExamResults };
