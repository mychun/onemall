const Tab = () => import('@/components/tab');
const User = () => import('@/views/user')

export default [
    {
        path: '/user', 
        components: {
            default: User,
            tab: Tab
        },
        meta: {
            keepAlive: true
        }
    }
]