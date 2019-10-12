const Tab = () => import('@/components/tab');
const Category = () => import('@/views/items/category');
const Search = () => import('@/views/items/search');
const Goods = () => import('@/views/items/goods');
const Default = () => import('@/views/items/default');

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
    },
    {
        path: '/goods/:type', 
        name: 'goods',
        component: Goods
    },
    {
        path: '/default/:id', 
        name: 'default',
        component: Default
    }
]