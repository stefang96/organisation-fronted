import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = (props) => {

    const navBarLeftItems = [
        {class:"  nav-item",name:"News",to:"/news"}, {class:"nav-item",name:"Organisation",to:"/organisation"}
    ]

    const navBarRightItems = [
        {class:"glyphicon glyphicon-log-in",name:"Login",to:"/login"}, {class:" ",name:"Register",to:"/register"}
    ]

 
    return (

        <>
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

        {navBarLeftItems.map((item)=>{

             return (  <li className={item.class}><Link className="nav-link active" to={item.to}>{item.name}</Link></li>)
        })}
        </ul>
         
         <ul className="nav navbar-nav navbar-right">
          {navBarRightItems.map((item)=>{

         return (  <li className="nav-item" ><Link to={item.to} className="nav-link"> <span className={item.class}></span> {item.name}</Link></li>)
            })}
     
         </ul>
        </>  
             
         
    )
}

export default NavBar
