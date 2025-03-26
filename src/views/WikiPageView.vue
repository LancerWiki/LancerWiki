<script setup lang="ts">
import TopAppBar from "@/components/TopAppBar.vue";
import BottomAppBar from "@/components/BottomAppBar.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import { ref, onMounted } from "vue";
import axios, { AxiosError } from "axios";
import { marked } from "marked";
import { useRoute } from "vue-router";
import { globalState } from "@/globals";

const route = useRoute();
const markdownContent = ref("");

onMounted(async () => {
    const { engine, trim } = route.params;
    const filePath = engine
        ? `${globalState.backendUrl}/engine/${engine}`
        : `${globalState.backendUrl}/car/${trim}`;
    try {
        const response = await axios.get(`${filePath}.md`);
        markdownContent.value = await marked(response.data);
    } catch (error) {
        console.error("Error fetching markdown file:", error);
        if (axios.isAxiosError(error)) {
            const status = error.response?.status;
            if (status === 404 || status === 500 || status === 503) {
                try {
                    const errorResponse = await axios.get(
                        `${globalState.backendUrl}/${status}.md`
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
    <NavigationDrawer />
    <div class="container" v-html="markdownContent"></div>
</template>
