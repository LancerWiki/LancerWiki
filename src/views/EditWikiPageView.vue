<script setup lang="ts">
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const markdownContent = ref("");
const isSaving = ref(false);

onMounted(async () => {
    const { engine, trim } = route.params;
    const filePath = engine ? `/wiki/engine/${engine}` : `/wiki/car/${trim}`;
    try {
        const response = await axios.get(`${filePath}.md`);
        markdownContent.value = response.data;
    } catch (error) {
        console.error("Error fetching markdown file:", error);
        markdownContent.value = "Error loading content.";
    }
});

const saveContent = async () => {
    const { engine, trim } = route.params;
    const filePath = engine ? `/wiki/engine/${engine}` : `/wiki/car/${trim}`;
    isSaving.value = true;
    try {
        await axios.post(`${filePath}.md`, {
            content: markdownContent.value,
        });
        router.push(filePath);
    } catch (error) {
        console.error("Error saving markdown file:", error);
    } finally {
        isSaving.value = false;
    }
};
</script>

<template>
    <div>
        <textarea v-model="markdownContent" rows="20" cols="80"></textarea>
        <button @click="saveContent" :disabled="isSaving">Save</button>
    </div>
</template>
