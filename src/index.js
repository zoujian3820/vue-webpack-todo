import Vue from 'vue'
import App from './App.vue'

const Dom = document.createElement('div')
document.body.appendChild(Dom)

new Vue({
    render: (h) => h(App)
    //component: { App } v1.0写法
}).$mount(Dom);