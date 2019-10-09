const Tab = () => import('@/components/tab');
const Home = () => import('@/views/home')

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
        path: '*', //任何路径
        redirect: {
            name: 'home'
        }
    }
]