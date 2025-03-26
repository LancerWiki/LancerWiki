<script setup lang="ts">
import "mdui";
import "mdui/mdui.css";
import TopAppBar from "@/components/TopAppBar.vue";
import BottomAppBar from "@/components/BottomAppBar.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
</script>

<template>
    <main>
        <TopAppBar />
        <NavigationDrawer />
        <div class="container">
            <h1>Welcome to Lancer Wiki</h1>
            <p>
                This is a wiki for Mitsubishi Lancers! Here you can find any
                information about any Lancer model or trim - even the most
                obscure.
            </p>
        </div>
        <BottomAppBar />
    </main>
</template>
