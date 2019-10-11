const Tab = () => import('@/components/tab');
const Category = () => import('@/views/items/category');
const Search = () => import('@/views/items/search');

export default [
    {
        path: '/items',
        redirect: {
            name: 'category'
        }
    },
    {
        path: '/category', 
        name: 'category',
        components: {
            default: Category,
            tab: Tab
        },
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/search', 
        name: 'search',
        component: Search,
        meta: {
            keepAlive: true
        }
    }
]