<script lang="ts">
import "mdui/mdui.css";
import "mdui";
import "mdui/components/navigation-drawer.js";
import type { Divider } from "mdui";
export default {
    name: "NavigationDrawer",
    props: {
        items: {
            type: Array as () => HTMLElement[],
            default: () => [],
        },
    },
    mounted() {
        console.log(this.items);
        for (const item of this.items) {
            console.log(item);
            const listItem = document.createElement("mdui-list-item");
            listItem.setAttribute("rounded", "");
            listItem.innerHTML = item.outerHTML;
            (this.$refs.info_headers as Divider).appendChild(listItem);
        }
    },
};
</script>

<template>
    <div class="navigation-drawer" style="position: relative; overflow: hidden">
        <mdui-navigation-drawer open id="navigation-drawer" ref="drawer">
            <mdui-list>
                <mdui-list-subheader></mdui-list-subheader>
                <mdui-list-item rounded icon="home--outlined"
                    >Home</mdui-list-item
                >
                <mdui-collapse accordion>
                    <mdui-collapse-item>
                        <mdui-list-item
                            rounded
                            slot="header"
                            icon="build--outlined"
                            >About</mdui-list-item
                        >
                        <div
                            style="margin-left: 2.5rem"
                            ref="info_headers"
                        ></div>
                    </mdui-collapse-item>
                </mdui-collapse>
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
