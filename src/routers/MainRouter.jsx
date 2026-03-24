import AdminDashboard from "../layouts/AdminDashboard";
import DashboardContent from "../pages/DashboardContent";
import UserManagement from "../pages/UserManagement";
import NoticeManagement from "../pages/NoticeManagement";
import Login from '../pages/Login'

const MainRouter = {
    path:"/",
    element:<AdminDashboard/>,
    children:[
        {
            path:'/dashboard',
            element:<DashboardContent/>
        },
        {
            path:'/user-management',
            element:<UserManagement/>
        },
        {
            path:'/notice',
            element:<NoticeManagement/>
        },
        {
            path:'/login',
            element:<Login/>
        },
    ]
}
 export default MainRouter;
 

