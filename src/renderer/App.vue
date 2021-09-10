<template>
  <v-app>
    <!-- 侧边栏 -->
    <v-navigation-drawer
      v-model="drawer"
      :width="200"
      permanent
      expand-on-hover
      app
    >
      <template v-slot:prepend>
        <v-list-item @click="() => {}">
          <v-list-item-icon>
            <v-icon>mdi-account-circle</v-icon>
          </v-list-item-icon>
          <v-list-item-title>登陆/注册</v-list-item-title>
        </v-list-item>

        <v-divider></v-divider>
      </template>
      <v-list nav dense>
        <v-list-item
          v-for="item in drawerMenu"
          :key="item.title"
          :to="item.to"
          link
          color="primary"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <template v-slot:append>
        <v-divider></v-divider>
        <v-list-item link dense>
          <v-list-item-icon>
            <v-icon>mdi-bitcoin</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>捐赠支持</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>
    </v-navigation-drawer>
    <!-- 系统栏 -->
    <v-system-bar app style="-webkit-app-region: drag; overflow: hidden">
      <v-row dense class="align-self-center flex-nowrap">
        <v-col
          class="
            d-flex
            justify-start
            align-self-center
            flex-nowrap
            text-no-wrap
          "
        >
          <v-hover v-slot="{ hover }" style="-webkit-app-region: no-drag">
            <v-icon
              :color="hover ? 'red darken-2' : 'red lighten-1'"
              @click="close"
              >mdi-circle</v-icon
            >
          </v-hover>
          <v-hover v-slot="{ hover }" style="-webkit-app-region: no-drag">
            <v-icon
              :color="hover ? 'orange darken-2' : 'orange lighten-1'"
              @click="max"
              >mdi-circle</v-icon
            >
          </v-hover>
          <v-hover v-slot="{ hover }" style="-webkit-app-region: no-drag">
            <v-icon
              :color="hover ? 'green darken-2' : 'green lighten-1'"
              @click="min"
              >mdi-circle</v-icon
            >
          </v-hover>
        </v-col>
        <v-col
          class="
            d-flex
            justify-center
            align-self-center
            flex-nowrap
            text-no-wrap
          "
        >
          高级笔记管理</v-col
        >
        <v-col
          class="d-flex justify-end align-self-center flex-nowrap text-no-wrap"
        >
          <v-icon>mdi-new-box</v-icon>
          <v-icon>mdi-information-variant</v-icon>
        </v-col>
      </v-row>
    </v-system-bar>
    <!-- 标题栏 -->
    <!-- <v-app-bar short light app>
      <v-app-bar-title>主页 </v-app-bar-title>
    </v-app-bar> -->
    <!-- 内容 -->
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import { ipcRenderer, remote } from "electron";
// const _this = this;
// const APP = process.type === 'renderer' ? remote.app : app;
export default Vue.extend({
  name: "App",
  data: () => ({
    drawer: true,
    drawerMenu: [
      { title: "主页", icon: "mdi-home-outline", to: "/" },
      { title: "管理", icon: "mdi-file-cabinet" },
      // { title: "笔记", icon: "mdi-note-text-outline", to: "/about" },
      { title: "存档", icon: "mdi-archive-outline" },
      { title: "统计", icon: "mdi-chart-box-outline" },
      { title: "设置", icon: "mdi-cog-outline" },
    ],
  }),
  methods: {
    max: () => {
      ipcRenderer.send("window-max");
    },
    min: () => {
      ipcRenderer.send("window-min");
    },
    close: () => {
      ipcRenderer.send("window-close");
    },
  },
});
</script>
<style lang="css">
* {
  user-select: none;
}
::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;
  height: 0;
}
.router-link-active {
  text-decoration: none;
}
</style>
