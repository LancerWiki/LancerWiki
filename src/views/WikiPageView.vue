<script setup lang="ts">
import TopAppBar from "@/components/TopAppBar.vue";
import BottomAppBar from "@/components/BottomAppBar.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import { ref, onMounted } from "vue";
import axios from "axios";
import { marked } from "marked";
import { useRoute } from "vue-router";

const route = useRoute();
const markdownContent = ref("");

onMounted(async () => {
    const { engine, trim } = route.params;
    const filePath = engine ? `/wiki/engine/${engine}` : `/wiki/car/${trim}`;
    try {
        const response = await axios.get(`${filePath}.md`);
        markdownContent.value = await marked(response.data);
    } catch (error) {
        console.error("Error fetching markdown file:", error);
        markdownContent.value = "Error loading content.";
    }
});
</script>

<template>
    <TopAppBar />
    <BottomAppBar />
    <NavigationDrawer />
    <div class="container" v-html="markdownContent"></div>
</template>
