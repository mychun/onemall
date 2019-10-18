const Tab = () => import('@/components/tab');
const Home = () => import('@/views/home');
const Search = () => import('@/views/items/search');

export default [
    {
        path: '/index',
        name: 'home',
        components: {
            default: Home,
            tab: Tab
        },
        meta: {
            keepAlive: true
        }
    },
    {
        path: '*', //任何不存在路由的页面
        redirect: {
            name: 'home'
        }
    }
]