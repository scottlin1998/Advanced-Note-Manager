// Mocks all files ending in `.vue` showing them as plain Vue instances
declare module '*.vue' {
  import { ComponentOptions } from 'vue'
  const component: ComponentOptions
  export default component
}

declare interface Window {
  bridge: {
    minimize: () => void,
    toggleMaximize: () => void,
    closeApp: () => void
  }
}