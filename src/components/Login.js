import React ,{useState}from 'react'
import {useHistory } from 'react-router'


function Login(props) {
    
    const [credintial, setcredintal] = useState({email:"" , password:""})
    let history = useHistory();



    const userlogin = async (e) => {
        e.preventDefault();


        const response = await fetch(`http://localhost:5000/api/auth/login`, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
  
        },
        body: JSON.stringify({ email: credintial.email ,  password : credintial.password })
  
        
      });
      const json = await response.json();
      console.log(json);

      if(json.success){
          //save the authtoken and redirect
          localStorage.setItem('token', json.jwttoken)
          props.showalert("logged in Successfully" ,"success ")
          history.push("/")


      }
      else{
          props.showalert("Invalid Details" ,"danger")

      }

    }
    
    const onChange = (e) => {
        setcredintal({ ...credintial, [e.target.name]: e.target.value })

}

    return (
        <div>

             <h2 className="mt-3">Login to continue to iNotebook</h2>

            <form onSubmit={userlogin} >
                <div className="my-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name="email" value={credintial.email} onChange={onChange} aria-describedby="emailHelp"  placeholder="Enter valid email"/>
                    <div id="emailHelp" className ="form-text">.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name="password" value={credintial.password} onChange={onChange} />
                </div>
              
                <button type="submit" className="btn btn-primary"   >Submit</button>
            </form>



        </div>
    )
}

export default Login
