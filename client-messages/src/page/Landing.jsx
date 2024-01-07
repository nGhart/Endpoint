import {Link } from 'react-router-dom'
const Landing=()=>{
    return (
      
      <div className='landingContainer'>

       <h2> Welcome to the Cookiez order List beads N more</h2>
        <h5 className="">Log in with your credentials</h5>
       
        <div className="landingButtons">
          
        <Link to='login'> <a href="#" className="btn btn-primary">Login</a></Link>
        </div>
      </div>
    
    )
}
export default Landing