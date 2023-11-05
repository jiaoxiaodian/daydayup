import {defineConfig} from "vite";
import viteBaseConfig from "./vite.base.config";
import viteDevConfig from "./vite.dev.config";
import viteProdConfig from "./vite.prod.config";

// 策略模式的写法
const envResolver = {
  'build': () => ({...viteBaseConfig, ...viteProdConfig}),
  'serve': () => ({...viteBaseConfig, ...viteDevConfig}),
}

export default defineConfig(({command}) => {
  
  return envResolver[command]();
});