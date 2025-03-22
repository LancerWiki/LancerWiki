<script lang="ts">
import "mdui/mdui.css";
import "mdui";
import "mdui/components/navigation-drawer.js";
export default {
    name: "NavigationDrawer",
};
</script>

<template>
    <div class="navigation-drawer" style="position: relative; overflow: hidden">
        <mdui-navigation-drawer open id="navigation-drawer">
            <mdui-list>
                <mdui-list-subheader></mdui-list-subheader>
                <mdui-list-item rounded icon="home--outlined"
                    >Home</mdui-list-item
                >
                <mdui-list-item rounded icon="build--outlined"
                    >Mechanic</mdui-list-item
                >
                <mdui-list-item rounded icon="edit--outlined"
                    >Edit</mdui-list-item
                >
                <mdui-list-item rounded icon="favorite_border--outlined"
                    >Favorites</mdui-list-item
                >
                <mdui-list-item rounded icon="settings--outlined"
                    >Settings</mdui-list-item
                >
            </mdui-list>
        </mdui-navigation-drawer>
    </div>
</template>
