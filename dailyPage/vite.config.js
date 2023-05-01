import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import { resolve } from 'path'
import vitePluginImp from 'vite-plugin-imp'
import fs from 'fs'
import path from 'path'
// VitePWA({ 
//   registerType: 'autoUpdate',
//   devOptions: {
//     enabled: true
//   } 
// })
// https://vitejs.dev/config/
export default defineConfig({
  base:'/dailyPage/dist/',
  plugins: [
    react(),
    vitePluginImp({
      libList: [
        {
          libName: "antd",
          style: (name) => `antd/lib/${name}/style/index.less`,
        },
      ],
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      }
    }
  },
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/pages/home.html'),
        calendar: resolve(__dirname, 'src/pages/calendar.html'),
        dairy: resolve(__dirname, 'src/pages/dairy.html'),
        account: resolve(__dirname, 'src/pages/account.html'),
        words: resolve(__dirname, 'src/pages/words.html'),
        todo: resolve(__dirname, 'src/pages/todo.html'),
        noteBook: resolve(__dirname, 'src/pages/noteBook.html'),
        login: resolve(__dirname, 'src/pages/login.html'),
        translator: resolve(__dirname, 'src/pages/translator.html'),
      }
    }
  },
  server: {
    port: 3008,
    host: true,
    // https: {
    //   // 主要是下面两行的配置文件，不要忘记引入 fs 和 path 两个对象
    //   cert: fs.readFileSync(path.join(__dirname, '/ssls/cert.crt')),
    //   key: fs.readFileSync(path.join(__dirname, '/ssls/cert.key'))
    // }
  }

})
