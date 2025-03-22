<script lang="ts">
import "mdui/mdui.css";
import "mdui";
import { useRouter, useRoute } from "vue-router";

export default {
    name: "BottomAppBar",
    setup() {
        const router = useRouter();
        const route = useRoute();

        const navigateToEdit = () => {
            const { engine, trim } = route.params;
            const editPath = engine
                ? `/wiki/engine/${engine}/edit`
                : `/wiki/car/${trim}/edit`;
            router.push(editPath);
        };

        return { navigateToEdit };
    },
};
</script>

<template>
    <div style="position: fixed; bottom: 0; width: 100%; z-index: 10">
        <mdui-bottom-app-bar
            fab-detach
            scroll-behavior="hide"
            scroll-threshold="30"
        >
            <mdui-button-icon icon="check_box--outlined"></mdui-button-icon>
            <mdui-button-icon icon="edit--outlined"></mdui-button-icon>
            <mdui-button-icon icon="mic_none--outlined"></mdui-button-icon>
            <mdui-button-icon icon="image--outlined"></mdui-button-icon>
            <div style="flex-grow: 1"></div>
            <mdui-fab icon="edit--outlined" @click="navigateToEdit"></mdui-fab>
        </mdui-bottom-app-bar>

        <div style="height: 200px; overflow: auto">
            <div style="height: 1000px"></div>
        </div>
    </div>
</template>
