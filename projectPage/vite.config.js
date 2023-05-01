import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import fs from 'fs'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  // base:'/projectPage/dist/',
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/pages/index.html'),
        user: resolve(__dirname, 'src/pages/user.html'),
        projects: resolve(__dirname, 'src/pages/projects.html'),
        project: resolve(__dirname, 'src/pages/project.html'),
        projectIn: resolve(__dirname, 'src/pages/projectIn.html'),
        projectUpload: resolve(__dirname, 'src/pages/projectUpload.html'),
        projectDownload: resolve(__dirname, 'src/pages/projectDownload.html'),
        internships: resolve(__dirname, 'src/pages/internships.html'),
        internship: resolve(__dirname, 'src/pages/internship.html'),
        youngs: resolve(__dirname, 'src/pages/youngs.html'),
        widgetsAdminPage: resolve(__dirname, 'src/pages/admins/widgets.html'),
        youngsAdminPage: resolve(__dirname, 'src/pages/admins/youngs.html'),
        internshipAdminPage: resolve(__dirname, 'src/pages/admins/internship.html'),
        projectsAdminPage: resolve(__dirname, 'src/pages/admins/projects.html'),
        projectInAdminPage: resolve(__dirname, 'src/pages/admins/projectIn.html'),
      }
    }
  },
  server: {
    port: 3001,
    host: true,
    // https: {
    //   // 主要是下面两行的配置文件，不要忘记引入 fs 和 path 两个对象
    //   cert: fs.readFileSync(path.join(__dirname, '/ssls/cert.crt')),
    //   key: fs.readFileSync(path.join(__dirname, '/ssls/cert.key'))
    // }
  }

})
