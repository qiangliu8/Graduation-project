import personCenter from 'page/center/center'
import personInfo from 'page/center/info'
import EditInfo from 'page/center/editinfo'
import OtherInfo from 'page/center/otherinfo'
import NoteInfo from 'page/home/noteinfo'
import NoteComment from 'page/home/notecomment'
import Home from 'page/home/home'
import Publish from 'page/publish'
import TalkList from 'page/talk/talk'
import TalkInfo from 'page/talk/talkinfo'

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
        exact:true,
        children:[
        ]
    },
    { 
        path:'/home/noteinfo/:id',
        component:NoteInfo,
        exact:true,
        children:[
        ]
    },
    { 
        path:'/home/noteinfo/comment/:id',
        component:NoteComment,
        exact:true,
        children:[
        ]
    },
    { 
        path:'/talk',
        component:TalkList,
        exact:true,
        children:[

        ]
    },
    { 
        path:'/talk/:to',
        component:TalkInfo,
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
        path:'/center/otherinfo/:other',
        exact:true,
        component:OtherInfo,
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
            {path:'talk',component:TalkList},
            {path:'center',component:personCenter}
        ]
    }

]