import home from "views/Home.js"
import SigninPage from "views/login"
import SignupPage from "views/signup"
import AdminPage from "views/Admin"
import User_test from "views/User_test"
import AdminTestPaperPage from "views/testpaper"
import uploadMaterialfile from "views/uploadMaterialfile"
import UserAdmit_card from "views/UserAdmit_card"
import Usercourse from "views/course"

var routes = [
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-caps-small",
    component: home,
    layout: "/admin",
    visible:true
  },
  {
    path: "/SigninPage",
    name: "Sign In",
    icon: "nc-icon nc-caps-small",
    component: SigninPage,
    layout: "/admin",
    visible:true
  }
  ,
  {
    path: "/SignupPage",
    name: "Sign Up",
    icon: "nc-icon nc-caps-small",
    component: SignupPage,
    layout: "/admin",
    visible:true
  },
  {
    path: "/AdminPage",
    name: "Admin",
    icon: "nc-icon nc-caps-small",
    component: AdminPage,
    layout: "/admin",
    visible:true
  },
  {
    path: "/User_test",
    name: "User Page",
    icon: "nc-icon nc-caps-small",
    component: User_test,
    layout: "/admin",
    visible:false
  },
  {
    path: "/AdminTestPaperPage",
    name: "Test Paper Page",
    icon: "nc-icon nc-caps-small",
    component: AdminTestPaperPage,
    layout: "/admin",
    visible:true
  }
  ,
  {
    path: "/UploadTestFile",
    name: "Upload Test File",
    icon: "nc-icon nc-caps-small",
    component: uploadMaterialfile,
    layout: "/admin",
    visible:true
  },
  {
    path: "/course",
    name: "Usercourse",
    icon: "nc-icon nc-caps-small",
    component: Usercourse,
    layout: "/admin",
    visible:true
  }
  
];
export default routes;
