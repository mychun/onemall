const Tab = () => import('@/components/tab');
const Cart = () => import('@/views/order/cart')

export default [
    {
        path: '/cart', 
        name: 'cart',
        components: {
            default: Cart,
            tab: Tab
        },
        meta: {
            keepAlive: true
        }
    }
]