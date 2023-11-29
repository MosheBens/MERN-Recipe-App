import { useState } from "react";
import axios from 'axios';
import {useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";


// export const Auth = () =>{
//     return( 
//         <div className="auth">
//              <Login/>
//              <Register/>
//         </div>
//     );    
// };

export const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);

    const switchForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className="auth">
            {isLogin ? <Login switchForm={switchForm}  />  : <Register switchForm={switchForm} />}
            <button type="button" className="btn btn-primary"  onClick={switchForm}  >{isLogin ? "Don't have an account? Register here." : "Already have an account? Login here."}</button>
        </div>
    );
};

const Login = () => {

    const [username,setUserName] = useState("");
    const [password,setPassword] = useState("");
    const userID = useGetUserID();

 
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            const response = await axios.post("http://localhost:3001/auth/login", {username, password});
            setCookies("access_token",response.data.token);
            window.localStorage.setItem("userID",response.data.userID);
            if(response.data.userID === null || response.data.userID === undefined){
                navigate("/auth");
            }else{
                navigate("/");
            }

        } catch(err) {
            console.error(err);
        }
        
    };    

    return <Form username={username} setUserName={setUserName} password={password} setPassword={setPassword} label={"Login"} onSubmit={onSubmit} />

};

const Register = () => {

    const [username,setUserName] = useState("");
    const [password,setPassword] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post("http://localhost:3001/auth/register", {username, password});
            alert("Registratin Completed ! Now You Have To LogIn")
        } catch (err) {
            console.error(err);
        }
    };

    return <Form username={username} setUserName={setUserName} password={password} setPassword={setPassword} label={"Register"} onSubmit={onSubmit} />
};

const Form = ({username,setUserName,password,setPassword, label , onSubmit}) =>{
    return (
        // <div className="auth-container">
        //     <form onSubmit={onSubmit}>
        //         <h2> {label} </h2>
        //         <div className="form-group">
        //             <label htmlFor="username"> Userame: </label>
        //             <input type="text" id="username" value={username} onChange={(event) => setUserName(event.target.value)}></input>
        //         </div>
        //         <div className="form-group">
        //             <label htmlFor="password"> Password: </label>
        //             <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
        //         </div>
        //         <button type="submit" className="btn btn-success"> {label} </button>
        //     </form>
        // </div>
    <div className="auth-container">
        <form onSubmit={onSubmit}>
            <h2> {label} </h2>
            <div className="form-group">
                <label htmlFor="username"> Userame: </label>
                <input type="text" id="username" value={username} onChange={(event) => setUserName(event.target.value)}></input>
            </div>
            <div className="form-group">
                <label htmlFor="password"> Password: </label>
                <input type="password" id="password" value={password} onChange={(event) => setPassword(event.target.value)}></input>
            </div>
            <button type="submit" className="btn btn-success"> {label} </button>
        </form>
    </div>
    );
    
};

export default Login;