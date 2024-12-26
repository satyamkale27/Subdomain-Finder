const puppeteer = require("puppeteer");

async function PostDomain(req, res) {
  let browser;
  try {
    browser = await puppeteer.launch();
    const page = await browser.newPage();
    const domain = req.body.domain;

    if (!domain) throw new Error("No query provided");

    await page.goto(`https://www.google.com/search?q=site:${domain}.com`, {
      waitUntil: "networkidle2",
    });

    let allResults = []; // Collect all results from pagination

    // Get initial page results
    const searchResults = await extractResults(page);
    allResults = allResults.concat(searchResults);

    // Check for pagination and collect results from subsequent pages
    while (await isNextPage(page, allResults)) {
      const nextPageResults = await extractResults(page);
      allResults = allResults.concat(nextPageResults);
    }

    // Send the combined result only once after all pages are processed
    if (allResults.length > 0) {
      res.status(200).json(allResults);
    } else {
      res.status(500).json({
        error: "Domains not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  } finally {
    if (browser) await browser.close();
  }
}

// Helper function to extract search results from the page
async function extractResults(page) {
  return await page.evaluate(() => {
    const results = [];
    const items = document.querySelectorAll("h3"); // items is a NodeList

    for (let i = 0; i < items.length; i++) {
      const parent = items[i].closest("a");
      if (parent) {
        results.push({
          title: items[i].innerText,
          domain: parent.href,
        });
      }
    }
    return results;
  });
}

// Helper function to check and navigate to the next page
async function isNextPage(page, allResults) {
  const nextPage = await page.$("#pnnext");

  if (allResults.length > 20) {
    return false;
  }

  if (nextPage) {
    await page.click("#pnnext");
    await page.waitForNavigation({ waitUntil: "networkidle2" });
    return true;
  } else {
    return false;
  }
}

module.exports = {
  PostDomain,
};
