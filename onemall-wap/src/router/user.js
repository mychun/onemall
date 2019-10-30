const Tab = () => import('@/components/tab');
const User = () => import('@/views/user');
const Login = () => import('@/views/user/login');
const Register = () => import('@/views/user/register');
const ForgetPsw = () => import('@/views/user/forgetPsw');

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
    }
]