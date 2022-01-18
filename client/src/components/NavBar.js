import React from 'react'
import {Link,useNavigate} from "react-router-dom"
const NavBar = () => {
  const token=localStorage.getItem("token")
  const navigate=useNavigate()
    return (
        <nav>
        <div className="nav-wrapper" style={{backgroundColor:"#214061"}}>
          <Link to="/" className="brand-logo left flow-text">&ldquo;Quote&rdquo;</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
          {
            token ? 
            <><li><Link to="/profile">Profile</Link></li>
            <li><Link to="/create">Create</Link></li>
            <li><button className="red btn" onClick={()=>{ localStorage.removeItem("token")
            navigate("/login")
             }}>Logout</button></li>
            </>
            :
            <><li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li></>
          }

          </ul>
        </div>

        
      </nav>



    )
}

export default NavBar
