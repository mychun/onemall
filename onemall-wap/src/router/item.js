const Tab = () => import('@/components/tab');
const Category = () => import('@/views/item/category');

export default [
    {
        path: '/category', 
        components: {
            default: Category,
            tab: Tab
        },
        meta: {
            keepAlive: true
        }
    }
]