"use strict";

addEventListener("fetch", (event) => {
    event.respondWith(handleRequest(event));
});

const GITHUB_BASE_URL =
    "https://raw.githubusercontent.com/LancerWiki/WikiData/main/wiki";

async function handleRequest(event) {
    const url = new URL(event.request.url);
    const path = url.pathname; // Extract the path from the request URL
    const githubUrl = `${GITHUB_BASE_URL}${path}`; // Construct the GitHub file URL

    try {
        const response = await fetch(githubUrl, {
            method: event.request.method,
            headers: {
                "User-Agent": "LancerWiki-Proxy", // Optional: Add a custom User-Agent
            },
        });

        // Clone the response and add CORS headers
        const modifiedResponse = new Response(response.body, response);
        modifiedResponse.headers.set("Access-Control-Allow-Origin", "*");
        modifiedResponse.headers.set(
            "Access-Control-Allow-Methods",
            "GET, OPTIONS"
        );
        modifiedResponse.headers.set(
            "Access-Control-Allow-Headers",
            "Content-Type"
        );

        return modifiedResponse;
    } catch (error) {
        return new Response("Error fetching the requested file.", {
            status: 500,
            statusText: "Internal Server Error",
        });
    }
}
