import personCenter from 'page/center/center'
import personInfo from 'page/center/info'
import Home from 'page/home'
import Talk from 'page/talk'

export const mainRoutes = [
    { 
        path:'/',
        exact:true,
        component:Home,
        children:[
        ]
    },
    { 
        path:'/home',
        component:Home,
        children:[
        ]
    },
    { 
        path:'/talk',
        component:Talk,
        children:[

        ]
    },
    {   
        path:'/center',
        exact:true,
        component:personCenter,
        children:[
            {   path:'/center/info',
                component:personInfo
            }
        ]
    },
    {   
        path:'/center/info',
        exact:true,
        component:personInfo,
    },
]