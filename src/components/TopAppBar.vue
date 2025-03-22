<script lang="ts">
import "mdui/mdui.css";
import "mdui";
import { ButtonIcon, setColorScheme, type NavigationDrawer } from "mdui";
export default {
    name: "Headerbar",
    methods: {
        toggleDarkMode() {
            let htmlMode = document.documentElement;
            if (htmlMode.classList.contains("mdui-theme-dark")) {
                htmlMode.classList.remove("mdui-theme-dark");
                htmlMode.classList.add("mdui-theme-light");
            } else {
                htmlMode.classList.remove("mdui-theme-light");
                htmlMode.classList.add("mdui-theme-dark");
            }
        },
        toggleDrawer() {
            const drawer = document.getElementById(
                "navigation-drawer"
            ) as NavigationDrawer;
            drawer.open = !drawer.open;
        },
        toggleFavorite() {
            const favoriteButton = document.getElementById(
                "favorite-button"
            ) as ButtonIcon;
            if (!favoriteButton) {
                console.error("Favorite button not found");
                return;
            }

            const colorVariable = getComputedStyle(favoriteButton)
                .getPropertyValue("--mdui-color-error")
                .trim();

            if (favoriteButton.selected) {
                favoriteButton.style.removeProperty("color");
            } else {
                favoriteButton.style.setProperty(
                    "color",
                    `rgb(${colorVariable})`
                );
            }
        },
        openColorPicker() {
            (this.$refs.colorPicker as HTMLInputElement).click();
        },
        colorSelected(event: Event) {
            const input = event.target as HTMLInputElement;
            this.selectedColor = input.value;
            console.log("Selected color:", this.selectedColor);
            setColorScheme(this.selectedColor);
        },
    },
    data() {
        return {
            selectedColor: "#03ebfc", // Default color
        };
    },
};
</script>

<template>
    <div>
        <mdui-top-app-bar variant="center-aligned">
            <mdui-button-icon
                icon="menu"
                @click="toggleDrawer"
            ></mdui-button-icon>
            <mdui-top-app-bar-title>Lancer Wiki</mdui-top-app-bar-title>
            <div style="flex-grow: 1"></div>

            <mdui-button-icon icon="search"></mdui-button-icon>

            <mdui-button-icon
                selectable
                id="favorite-button"
                icon="favorite_border"
                selected-icon="favorite"
                @click="toggleFavorite"
            ></mdui-button-icon>

            <mdui-button-icon
                icon="palette"
                @click="openColorPicker"
            ></mdui-button-icon>
            <input
                type="color"
                ref="colorPicker"
                @input="colorSelected"
                style="display: none"
            />
            <mdui-switch id="dark-mode-switch" @change="toggleDarkMode()">
                <mdui-icon slot="unchecked-icon" name="dark_mode"></mdui-icon>
                <mdui-icon slot="checked-icon" name="light_mode"></mdui-icon>
            </mdui-switch>
        </mdui-top-app-bar>
    </div>
</template>
