<template>
<q-layout view="hHh lpR fFf">
    <q-header style="-webkit-app-region: drag;">
        <q-bar>
            <q-btn dense flat :icon="leftDrawerOpen?'menu_open':'menu'" @click="toggleLeftDrawer" style="-webkit-app-region: no-drag;" />
            <div>高级笔记管理</div>

            <q-space />

            <q-btn dense flat icon="minimize" @click="minimize" style="-webkit-app-region: no-drag;" />
            <q-btn dense flat icon="crop_square" @click="toggleMaximize" style="-webkit-app-region: no-drag;" />
            <q-btn dense flat icon="close" @click="closeApp" style="-webkit-app-region: no-drag;" />
        </q-bar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered :width="200">
        <q-img src="https://cdn.quasar.dev/img/material.png" style="height: 150px">
            <div class="absolute-bottom bg-transparent">
                <q-avatar size="56px" class="q-mb-sm">
                    <img src="https://cdn.quasar.dev/img/boy-avatar.png">
                </q-avatar>
                <div class="text-weight-bold">Razvan Stoenescu</div>
                <div>@rstoenescu</div>
            </div>
        </q-img>
        <q-list padding>
            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-icon name="home" />
                </q-item-section>

                <q-item-section>
                    主页
                </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-icon name="folder" />
                </q-item-section>

                <q-item-section>
                    管理
                </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-icon name="archive" />
                </q-item-section>

                <q-item-section>

                    存档
                </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-icon name="analytics" />
                </q-item-section>

                <q-item-section>
                    统计
                </q-item-section>
            </q-item>

            <q-separator spaced />

            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-icon name="settings" />
                </q-item-section>

                <q-item-section>
                    设置
                </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-icon name="money" />
                </q-item-section>

                <q-item-section>
                    捐赠
                </q-item-section>
            </q-item>

            <q-item clickable v-ripple>
                <q-item-section avatar>
                    <q-icon name="info" />
                </q-item-section>

                <q-item-section>
                    关于
                </q-item-section>
            </q-item>
        </q-list>

    </q-drawer>

    <q-page-container>
        <router-view />
    </q-page-container>
</q-layout>
</template>

<script lang="ts">
import {
    defineComponent,
    ref
} from 'vue'

export default defineComponent({
    name: 'MainLayout',

    setup() {
        const leftDrawerOpen = ref(true)

        function minimize() {
            if (process.env.MODE === 'electron') {
                window.bridge.minimize();
            }
        }

        function toggleMaximize() {
            if (process.env.MODE === 'electron') {
                window.bridge.toggleMaximize()
            }
        }

        function closeApp() {
            if (process.env.MODE === 'electron') {
                window.bridge.closeApp()
            }
        }

        return {
            leftDrawerOpen,
            minimize,
            toggleMaximize,
            closeApp,
            toggleLeftDrawer() {
                leftDrawerOpen.value = !leftDrawerOpen.value
            }

        }
    }
})
</script>
