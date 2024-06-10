// import axios from "axios";
// import cheerio from "cheerio";

// async function fetchKukExamUpdates(url) {
//   try {
//     // console.log(url);
//     const { data } = await axios.get(url);
//     const $ = cheerio.load(data);

//     const updates = [];
//     $("tr").each((index, element) => {
//       const date = $(element).find("td").first().text().trim();
//       $(element)
//         .find(".result_link_text a")
//         .each((i, el) => {
//           const title = $(el).text().trim();
//           let link = $(el).attr("href");
//           // Sanitize the link by encoding spaces and special characters
//           link = encodeURI(link);

//           updates.push({
//             title,
//             date,
//             link,
//           });
//         });
//     });

//     return updates;
//     // console.log(updates, "updates");
//   } catch (error) {
//     console.error("Error fetching results:", error);
//   }
// }

// export { fetchKukExamUpdates };
