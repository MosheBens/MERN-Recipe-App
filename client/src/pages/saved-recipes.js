import {useEffect, useState} from "react"
import axios from 'axios';
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";

export const SavesRecipes = () =>{

    const [savedRecipes, setSavedRecipes] = useState([]);
    const userID = useGetUserID();
    const navigate = useNavigate();

    useEffect(() => {

        if((userID === "undefined") || (userID === null)){
            navigate("/auth");
        }

        const fetchSavedRecipe = async () => {
            try{
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
                // console.log(response.data);
            } catch(err) {
                console.error(err);
            }
        };

        fetchSavedRecipe();
    }, []);


 
    return(
            <div>
                <h1 style={{marginTop:"50px",marginLeft:"20px"}}> Saved Recipes</h1>
                <ul className="homerecipesmenu">
                    {savedRecipes.map((recipe) => (
                        <li key={recipe._id} className="resipeShowScreen card" >
                            <div>
                                <h2>{recipe.name}</h2>
                                <h5>Author : {recipe.nameOfUserRecipe} </h5>
                            </div>
                            <div className="instructions" >
                                <h5 style={{color:"red",textDecoration:"underline"}}> Instructions:</h5> 
                                <p>{recipe.instructions}</p>
                            </div>
                            <img src={recipe.imageUrl} alt={recipe.name}  />
                            <h4 style={{color:"red",textDecoration:"underline"}}>
                                    Ingredients: 
                            </h4>  
                            <h5>
                                {recipe.ingredients.map((ingredient, index) => (
                                         <div key={index}> <ol><li value={index}>  {ingredient} </li></ol>  </div>
                                    ))}
                             </h5>
                            <p>
                                Cooking Time: {recipe.cookingTime} Minutes
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        ); 
}
