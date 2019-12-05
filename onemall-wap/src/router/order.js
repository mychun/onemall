const Tab = () => import('@/components/tab');
const Cart = () => import('@/views/order/cart');
const Order = () => import('@/views/order/order-details');

export default [
    {
        path: '/cart', 
        name: 'cart',
        components: {
            default: Cart,
            tab: Tab
        }
    },
    {
        path: '/order', 
        name: 'order',
        components: {
            default: Order
        }
    }
]