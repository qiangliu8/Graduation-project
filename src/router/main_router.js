import personCenter from 'page/center/center'
import personInfo from 'page/center/info'
import EditInfo from 'page/center/editinfo'
import Home from 'page/home'
import Publish from 'page/publish'
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
        path:'/publish',
        component:Publish,
        children:[

        ]
    },
    {   
        path:'/center',
        exact:true,
        component:personCenter,
        children:[
            // {   path:'/center/info',
            //     component:personInfo
            // }
        ]
    },
    {   
        path:'/center/info',
        exact:true,
        component:personInfo,
    },
    {   
        path:'/center/editinfo/:text',
        component:EditInfo,
    },

    
]


export const routeConfig = [
    {
        path:'/',
        component:Home,
        childRoutes:[
            {path:'home',component:Home},
            {path:'talk',component:Talk},
            {path:'center',component:personCenter}
        ]
    }

]