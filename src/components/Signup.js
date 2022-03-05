import React, { useState } from 'react'
import {useHistory } from 'react-router'

function Signup(props) {

    const [credintial, setcredintal] = useState({ email: "", password: "", name: "", })
    let history = useHistory();
    const usersignup = async (e) => {
        e.preventDefault()


        const response = await fetch(`http://localhost:5000/api/auth/createuser`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'

            },
            body: JSON.stringify({
                name: credintial.name
                , email: credintial.email, password: credintial.password
            })


        });
        const json = await response.json();
        console.log(json);

        if (json.success) {
            //save auth token and redirect
            localStorage.setItem('token', json.jwttoken);
            props.showalert("Sucessfully Account Created" ,"success")
            history.push("/")

        }
        else {
            props.showalert("Invalid credential" ,"danger")
        }


    }

    const onchange = (e) => {
        setcredintal({ ...credintial, [e.target.name]: e.target.value })

    }


    


    return (
        <div className="container mt-2" >
             
             <h2 className="mt-3">Create an Account to use iNotebook</h2>


            <form onSubmit={usersignup}>
                <div className="my-3">
                    <label htmlFor="name" className="form-label">Name :</label>
                    <input type="text" className="form-control" id="name" name="name" onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email :</label>
                    <input type="email" className="form-control" id="email" name="email" onChange={onchange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password :</label>
                    <input type="password" className="form-control" id="password" name="password" minLength={5} required onChange={onchange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password :</label>
                    <input type="cpassword" className="form-control" id="cpassword" name="cpassword" minLength={5} required onChange={onchange} />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

        </div>
    )
}

export default Signup
