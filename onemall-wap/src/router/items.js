const Tab = () => import('@/components/tab');
const Category = () => import('@/views/items/category');
const CategoryList = () => import('@/views/items/category-list');
const Search = () => import('@/views/items/search');
const Goods = () => import('@/views/items/goods');
const Details = () => import('@/views/items/details');

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
        path: '/categoryList/:id', 
        name: 'categoryList',
        component: CategoryList
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
        path: '/details/:id', 
        name: 'details',
        component: Details
    }
]