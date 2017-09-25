import App from '../App'
const home = r => require.ensure([], () => r(require('../pages/home')), 'home')
const actList = r => require.ensure([], () => r(require('../pages/activityList')), 'actList')
const register = r => require.ensure([], () => r(require('../pages/register')), 'register')
const validate = r => require.ensure([], () => r(require('../pages/validate')), 'validate')
const password = r => require.ensure([], () => r(require('../pages/password')), 'password')
const actDetail = r => require.ensure([], () => r(require('../pages/activityDetail')), 'actDetail')
const croomList = r => require.ensure([], () => r(require('../pages/classroomList')), 'croomList')
const placeOrder = r => require.ensure([], () => r(require('../pages/placeOrder')), 'placeOrder')
const profile = r => require.ensure([], () => r(require('../pages/profile')), 'profile')
const subscribe = r => require.ensure([], () => r(require('../pages/subscribe')), 'subscribe')
const teacherList = r => require.ensure([], () => r(require('../pages/teacherList')), 'teacherList')
const lessonList = r => require.ensure([], () => r(require('../pages/lessonList')), 'lessonList')
const payResultList = r => require.ensure([], () => r(require('../pages/payResultList')), 'payResultList')
const sysMsgList = r => require.ensure([], () => r(require('../pages/sysMsgList')), 'sysMsgList')
const couponList = r => require.ensure([], () => r(require('../pages/couponList')), 'couponList')
const evaluate = r => require.ensure([], () => r(require('../pages/evaluate')), 'evaluate')

const demo =r => require.ensure([], () => r(require('../pages/demo')), 'demo')
const left =r => require.ensure([], () => r(require('../pages/swipeleftdelete')), 'left')

const lessonDetail = r => require.ensure([], () => r(require('../pages/lessonDetail')), 'lessonDetail')
const croomDetail = r => require.ensure([], () => r(require('../pages/classroomDetail')), 'croomDetail')
const teacherDetail = r => require.ensure([], () => r(require('../pages/teacherDetail')), 'teacherDetail')
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
        path: '/profile',
        component: profile,
        meta: {
            hasMenu: true
        }
    },
    {
        path: '/subscribe',
        component: subscribe,
        meta: {
            hasMenu: true
        }
    },
    {
        path: '/actList',
        component: actList
    },
    {
        path: '/croomList',
        component: croomList
    },
    {
        path: '/teacherList',
        component: teacherList
    },
    {
        path: '/lessonList',
        component: lessonList
    },
    {
        path: '/lessonDetail',
        component: lessonDetail
    },
    {
        path: '/croomDetail',
        component: croomDetail
    },
    {
        path: '/croomDetail:id',
        component: croomDetail
    },
    {
        path: '/lessonDetail:detailId',
        component: lessonDetail
    },
    {
        path: '/teacherDetail:tid',
        component: teacherDetail
    },
    {
        path: '/teacherDetail',
        component: teacherDetail
    },
    {
        path: '/payResultList',
        component: payResultList
    },
    {
        path: '/couponList',
        component: couponList
    },
    {
        path: '/sysMsgList',
        component: sysMsgList
    },
    {
        path: '/placeOrder',
        component: placeOrder
    },
    {
        path: '/actDetail:detailId',
        component: actDetail
    },
    {
        path: '/actDetail',
        component: actDetail
    },
    {
        path: '/register',
        component: register
    },
    {
        path: '/validate',
        component: validate
    },
    {
        path: '/password',
        component: password
    },
    {
        path: '/evaluate',
        component: evaluate
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