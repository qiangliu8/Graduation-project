import LoginPage from 'page/login'
import RegisterPage from 'page/register'
import AuthPage from 'page/auth'
import HomePage from 'page/homepage'
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
        path:'/adminpage',
        component:HomePage,
    },
    {   path:'/',
        component:HomePage,
    },
]