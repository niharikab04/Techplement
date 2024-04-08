import { useEffect, useState,useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  const {setUserInfo,userInfo}=useContext(UserContext);
  
  function logout(){
    console.log("hey");
    fetch('http://127.0.0.1:5000/logout',{
      credentials:'include',
      method:'POST'
    }
    ).then(()=>{
      console.log(userInfo);
      setUserInfo(null);
    })
   
  }

const username=userInfo?.username;//?-it can be null sometimes

  return (
    <header style={{ backgroundColor: '#e87e35', padding: "10px 0", zIndex: 1000, position: "sticky", top: 0 }}>
     <nav  >       
       {username&&(
          <div style={{display:"flex",justifyContent:'space-around'}} >
             <span><b>Heyy, {username}</b></span>
            <h1 >SoulSpill</h1>
         
         

          <a onClick={logout}><b>Logout</b></a>
        
          </div>
        )}
        {!username&&
         <>
        <div style={{display:"flex",justifyContent:"space-around"}}>
          <Link  className='link' to="/login" ><b>Login</b></Link>{/*use Link instead of a */}
          <h1 >SoulSpill</h1>

        <Link className='link' to="/signup"><b>SignUp</b></Link>
        </div>
         </>        
                
        }

      
      </nav>
  </header>  )
}
