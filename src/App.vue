<script setup lang="ts">
import { setColorScheme } from "mdui";
import { onMounted } from "vue";
import { RouterView } from "vue-router";

onMounted(() => {
    setColorScheme("#03ebfc");
});
</script>

<template>
    <RouterView />
</template>
