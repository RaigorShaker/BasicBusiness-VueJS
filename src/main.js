import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/router'
import store from './vuex';
import axios from 'axios'
import MintUI from 'mint-ui'
import './static/style/style.css'
// import footGuide from './components/footer/footGuide'
import errorMessage from './components/requestError'
import { Picker } from 'mint-ui';
import { Popup } from 'mint-ui';
import { Swipe, SwipeItem } from 'mint-ui';
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
Vue.component(Picker.name, Picker);
Vue.component(Popup.name, Popup);
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
// import VueImgInputer from 'vue-img-inputer'
Vue.prototype.$ajax = axios
Vue.use(VueRouter)
Vue.use(MintUI)
// Vue.component('footGuide', footGuide)
Vue.component('errorMessage', errorMessage)
// Vue.component('VueImgInputer', VueImgInputer)
const router = new VueRouter({
	// routes
	// mode: 'history',
  	routes: routes
})

new Vue({
	router,
	store
}).$mount('#app')