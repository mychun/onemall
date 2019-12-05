const Tab = () => import('@/components/tab');
const User = () => import('@/views/user/index');
const Login = () => import('@/views/user/login');
const Register = () => import('@/views/user/register');
const ForgetPsw = () => import('@/views/user/forgetPsw');
const Address = () => import('@/views/user/address');
const AddAddress = () => import('@/views/user/add-address');

export default [
    {
        path: '/user', 
        name: 'user',
        components: {
            default: User,
            tab: Tab
        },
        meta: {
            keepAlive: true
        }
    },
    {
        path: '/user/login', 
        name: 'login',
        component: Login
    },
    {
        path: '/user/register', 
        name: 'register',
        component: Register
    },
    {
        path: '/user/forgetPsw', 
        name: 'forgetPsw',
        component: ForgetPsw
    },
    {
        path: '/user/address', 
        name: 'address',
        component: Address
    },
    {
        path: '/user/address/:type', 
        name: 'addressSel',
        component: Address
    },
    {
        path: '/user/addAddress/', 
        name: 'addAddress',
        component: AddAddress
    }
]