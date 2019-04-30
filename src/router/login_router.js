import LoginPage from 'page/login'
import RegisterPage from 'page/register'
import AuthPage from 'page/auth'
import HomePage from 'page/homepage'
import adminPage from 'page/admin'
export const loginRoutes = [
    { 
        path:'/login',
        component:LoginPage,
    },
    { 
        path:'/auth',
        component:AuthPage,
    },
    {  
        path:'/register',
        component:RegisterPage,
    },
    {   
        path:'/adminPage',
        component:adminPage,
    },
    {   path:'/',
        component:HomePage,
    },
]