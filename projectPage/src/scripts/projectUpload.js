import { createApp } from 'vue'
import App from '../components/ProjectUpload.vue'
import Header from '../components/sonPage/Header.vue'
import Footer from '../components/sonPage/Footer.vue'
import '../index.css'

createApp(App).mount('#app')
createApp(Header).mount('#header')
createApp(Footer).mount('#footer')
