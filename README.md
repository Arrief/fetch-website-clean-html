# Fetch Website HTML (cleaned)

## Description
This is a small Node.js application which asks for a website URL as input, then cleans the website's HTML of unnecessary elements, tags and attributes and finally saves the clean HMTL into a txt file.

The idea behind this application was to get concise HTML relevant for SEO text generation, e.g. passing the clean HTML as part of a prompt for SEO texts to a generative AI.

## Local installation

After cloning this repository from Github, use the terminal to cd into the directory, then run `npm install`.

After that, run `node fetchWebsiteCleanHtml.js` and enter the URL of a website of your choice. The output file will be saved into this directory.
