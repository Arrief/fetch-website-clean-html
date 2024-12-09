const axios = require("axios");
const fs = require("fs");
const readline = require("readline");

// Create an interface for reading user input from the terminal
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function fetchWebsiteHtml(url) {
    try {
        const response = await axios({ method: "GET", url });

        const onlyBody = response?.data?.match(/<body>(.|\s)*<\/body>/g)?.[0];
        const bodyCleaned = onlyBody
            // Remove <script>, <noscript>, <svg>, and <style> tags with their content
            .replace(/<(script|noscript|svg|style)[\s\S]*?>[\s\S]*?<\/\1>/gi, "")
            // Remove inline styles, class names, srcSet, and data-* attributes
            .replace(/\s*(class|style|srcSet|data-[a-zA-Z0-9-]+)\s*=\s*(['"][^'"]*['"])/gi, "")
            // Remove <div> tags but keep their content
            .replace(/<div[^>]*>/gi, "")
            .replace(/<\/div>/gi, "")
            // Remove empty tags
            .replace(/<([a-z]+)[^>]*>\s*<\/\1>/gi, "")
            // Replace line breaks with spaces
            .replace(/(\n|\r)/g, " ");

        return bodyCleaned;
    } catch (error) {
        throw new Error(`Error fetching the website: ${error.message}`);
    }
}

// Prompt the user for a URL and use it as an argument to fetchWebsite
rl.question("Please enter a URL: ", async (inputUrl) => {
    try {
        const result = await fetchWebsiteHtml(inputUrl);
        const cleanUrl = inputUrl.replace("https://", "").replace(/[^a-zA-Z0-9]/g, "-");

        fs.writeFileSync(`${cleanUrl}_HTML.txt`, result, "utf-8");
        console.log(`Website content saved to ${cleanUrl}_HTML.txt`);
    } catch (error) {
        console.error(error.message);
    } finally {
        rl.close();
    }
});

