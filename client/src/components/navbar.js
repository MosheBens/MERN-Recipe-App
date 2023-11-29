import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { useGetUserID } from "../hooks/useGetUserID";
import axios from 'axios';


export const Navbar = () =>{

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLinkClick = () => {
      // Close the menu when a link is clicked
      setIsMenuOpen(false);
    };


    const [cookies, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();
    const userID = useGetUserID();

    const logout = () => {
        setCookies("access_token","");
        window.localStorage.removeItem("userID");
        navigate("/auth");
    };

  
    return (
        <div className="navbar navbar-expand-sm bg-danger">
            <div className="">
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className={`collapse navbar-collapse ${isMenuOpen ? "show" : ""}`} id="navbarTogglerDemo02" >
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

                            <li className="nav-item">
                            <Link to="/" className="navbar-brand" onClick={handleLinkClick}> Home </Link>
                            </li>




                            <li className="nav-item">
                            {(!cookies.access_token) || (userID === "undefined") ?  (<Link to="/auth" className="navbar-brand" onClick={handleLinkClick}> Auth </Link>) 
                            : (
                            <>
                                <Link to="/saved-recipes" className="navbar-brand" onClick={handleLinkClick}> Saved Recipes </Link>
                            </>
                            )}
                            </li>



                            <li className="nav-item">
                            {(!cookies.access_token) || (userID === "undefined") ?  "" 
                            : (
                            <>
                                <Link to="/create-recipe" className="navbar-brand" onClick={handleLinkClick}> Create Recipe </Link>
                            </>
                            )}
                            </li>



                            <li className="nav-item">
                            {(!cookies.access_token) || (userID === "undefined") ? "" 
                            : (
                            <>
                                <button onClick={logout} className="btn btn-danger signoutonbutton" style={{color:"black",fontFamily:"cursive",fontSize:"20px",padding:"0"}} > LogOut</button> 
                            </>
                            )}
                            
                            </li>

                        </ul>
                    </div>
            </div>
        </div>
    );
};