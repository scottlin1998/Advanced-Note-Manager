module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      mainProcessFile: 'src/main/index.ts',
      builderOptions: {
        appId: "com.scottlin1998.advanced_note_manger",
        productName: "高级笔记管理",
        extraResources: ["./extraResources/**"],
        win: {
          icon: "public/favicon.ico",
        },
        nsis: {
          // 是否一键安装
          oneClick: false, 
          // 允许修改安装目录
          allowToChangeInstallationDirectory: true, 
          createDesktopShortcut: true,
          createStartMenuShortcut: false,
          // 图标名称
          shortcutName: "高级笔记管理", 
          runAfterFinish: false
        }
      }
    }
  },
  pages: {
    index: 'src/renderer/index.ts'
  },
  // 重新定义路径后，避免webpack找不到main.ts文件
  lintOnSave: false
}
