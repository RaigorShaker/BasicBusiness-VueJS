import App from '../App'
const home = r => require.ensure([], () => r(require('../pages/home')), 'home')

const demo =r => require.ensure([], () => r(require('../pages/demo')), 'demo')
export default [{
    path: '/',
    component: App,
    children: [{
        path: '',
        // redirect: '/',
        component: home,
        meta: {
            hasMenu: true
        }
    }, {
        path: '/home',
        component: home,
        meta: {
            hasMenu: true
        }
    }, 
    {
        path: '/demo',
        component: demo,
        meta: {
            hasMenu: true
        }
    }]
}]