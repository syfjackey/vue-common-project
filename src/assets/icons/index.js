import Vue from 'vue'
import IconImg from '@/components/common/IconImg.vue'// svg component

// register globally
Vue.component('IconImg', IconImg)
const req = require.context('./svg', false, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)