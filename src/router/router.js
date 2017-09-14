import App from '../App'
const home = r => require.ensure([], () => r(require('../pages/home')), 'home')

const demo =r => require.ensure([], () => r(require('../pages/demo')), 'demo')
const left =r => require.ensure([], () => r(require('../pages/swipeleftdelete')), 'left')

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
    },
    {
        path: '/left',
        component: left,
        meta: {
            hasMenu: true
        }
    }]
}]