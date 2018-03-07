import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
import Main from './views/Main.vue'
import PostsList from './views/examples/Posts/PostsList.vue'
import PostForm from './views/examples/Posts/PostForm.vue'
import Form from './views/examples/Form.vue'
import echarts from './views/examples/echarts.vue'

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    //{ path: '/main', component: Main },
    {
        path: '/',
        component: Home,
        name: 'Examples',
        iconCls: 'el-icon-star-on',
        children: [
            {
                path: 'main', component: Main, name: 'Main', hidden: true
            },
            {
                path: 'form', component: Form, name: 'Form'
            },
            {
                path: 'echarts', component: echarts, name: 'Charts'
            }
        ]
    },
    {
        path: '/posts',
        component: Home,
        name: 'Posts',
        iconCls: 'el-icon-edit',
        children: [
            {
                path: '', component: PostsList, name: 'Posts List'
            },
            {
                path: 'add', component: PostForm, name: 'Add Post'
            },
            {
                path: ':id', component: PostForm, name: 'Edit Post', hidden: true
            }
        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: {path: '/404'}
    }
];

export default routes;