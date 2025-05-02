<script setup lang="ts">
import TopAppBar from "@/components/TopAppBar.vue";
import BottomAppBar from "@/components/BottomAppBar.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { marked } from "marked";
import { useRoute } from "vue-router";
import { globalState } from "@/globals";
import "mdui";
import "mdui/mdui.css";

const route = useRoute();
const markdownContent = ref("");
const tocItems = ref<HTMLElement[]>([]); // Table of contents items

// WalkTokens function to extract h1 and h2 headings
const walkTokens = (token: any) => {
    if (token.type === "heading" && (token.depth === 1 || token.depth === 2)) {
        const id = token.text.toLowerCase().replace(/\s+/g, "-"); // Generate an ID for the heading
        const linkElement = document.createElement("a");
        linkElement.href = `#${id}`;
        linkElement.innerHTML = token.text;
        tocItems.value.push(linkElement); // Add to TOC
        token.text = `<span id="${id}">${token.text}</span>`; // Add an ID to the heading
        console.log(tocItems.value);
    }
};

// Register the walkTokens function with marked
marked.use({ walkTokens });

onMounted(async () => {
    const { engine, trim } = route.params;
    const filePath = engine
        ? `${globalState.proxyUrl}/engine/${engine}`
        : `${globalState.proxyUrl}/car/${trim}`;
    try {
        const response = await axios.get(`${filePath}.md`);
        markdownContent.value = await marked(response.data); // Parse markdown with marked
    } catch (error) {
        console.error("Error fetching markdown file:", error);
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 404 || status === 500 || status === 503) {
                try {
                    const errorResponse = await axios.get(
                        `${globalState.proxyUrl}/${status}.md`
                    );
                    markdownContent.value = await marked(errorResponse.data);
                } catch (errorMarkdownFetch) {
                    console.error(
                        "Error fetching error markdown file:",
                        errorMarkdownFetch
                    );
                    markdownContent.value = "Error loading content";
                }
            } else {
                markdownContent.value = "Error loading content";
            }
        } else {
            markdownContent.value = "Error loading content";
        }
    }
});
</script>

<template>
    <TopAppBar />
    <BottomAppBar />
    <NavigationDrawer :items="tocItems" />
    <div class="container" v-html="markdownContent"></div>
</template>

<style>
tr:nth-child(even) {
    background-color: rgb(var(--mdui-color-surface-container-high));
}
</style>
