import App from '../App'
const home = r => require.ensure([], () => r(require('../pages/home')), 'home')
const actList = r => require.ensure([], () => r(require('../pages/activityList')), 'actList')
const register = r => require.ensure([], () => r(require('../pages/register')), 'register')
const validate = r => require.ensure([], () => r(require('../pages/validate')), 'validate')
const password = r => require.ensure([], () => r(require('../pages/password')), 'password')
const actDetail = r => require.ensure([], () => r(require('../pages/activityDetail')), 'actDetail')
const croomList = r => require.ensure([], () => r(require('../pages/classroomList')), 'croomList')
const placeOrder = r => require.ensure([], () => r(require('../pages/placeOrder')), 'placeOrder')
const placeOrderTeacher = r => require.ensure([], () => r(require('../pages/placeOrderTeacher')), 'placeOrderTeacher')

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
const messageList = r => require.ensure([], () => r(require('../pages/messageList')), 'messageList')
const myOrder = r => require.ensure([], () => r(require('../pages/myorder')), 'myOrder')
const login = r => require.ensure([], () => r(require('../pages/login')), 'login')

const orderDetailCourse = r => require.ensure([], () => r(require('../pages/orderDetailCourse')), 'orderDetailCourse')
const orderDetailTeacher = r => require.ensure([], () => r(require('../pages/orderDetailTeacher')), 'orderDetailTeacher')
const orderDetailRoom = r => require.ensure([], () => r(require('../pages/orderDetailRoom')), 'orderDetailRoom')

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
        path: '/login',
        component: login
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
        path: '/placeOrder:rid',
        component: placeOrder
    },
    {
        path: '/placeOrder',
        component: placeOrder
    },
    {
        path: '/placeOrderTeacher:tid',
        component: placeOrderTeacher
    },
    {
        path: '/placeOrderTeacher',
        component: placeOrderTeacher
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
        path: '/messageList',
        component: messageList
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
        path: '/myOrder',
        component: myOrder
    },
    {
        path: '/myOrder:status',
        component: myOrder
    },
    {
        path: '/evaluate',
        component: evaluate
    },
    {
        path: '/evaluate?oid',
        component: evaluate
    },
    {
        path: '/orderDetailCourse:oid',
        component: orderDetailCourse
    },
    {
        path: '/orderDetailCourse',
        component: orderDetailCourse
    },
    {
        path: '/orderDetailTeacher:oid',
        component: orderDetailTeacher
    },
    {
        path: '/orderDetailTeacher',
        component: orderDetailTeacher
    },
    {
        path: '/orderDetailRoom:oid',
        component: orderDetailRoom
    },
    {
        path: '/orderDetailRoom',
        component: orderDetailRoom
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