import { useContext, useEffect, useState} from "react"
import axios from 'axios';
import { useGetUserID } from "../hooks/useGetUserID";
import {useCookies } from "react-cookie";

export const Home = () =>{

    const [recipes, setRecipes] = useState([]);
    const [savedRecipes,setSavedRecipes] = useState();
    const [cookies, _] = useCookies(["access_token"]);


    const userID = useGetUserID();

    useEffect(() => {
        const fetchRecipe = async () => {
            try{
                const response = await axios.get("http://localhost:3001/recipes");
                setRecipes(response.data);
                console.log(response);
                // console.log(username);
            } catch(err) {
                console.error(err);
            }
        };

        const fetchSavedRecipe = async () => {
            try{
                const response = await axios.get(`http://localhost:3001/recipes/savedRecipes/ids/${userID}`);
                setSavedRecipes(response.data.savedRecipes);
                // console.log(response.data);
            } catch(err) {
                console.error(err);
            }
        };

        fetchRecipe();
        fetchSavedRecipe(); 
    }, []);



    const saveRecipe = async (recipeID) => {
        try{
            const response = await axios.put("http://localhost:3001/recipes",{recipeID,userID},{headers:{authorization:cookies.access_token}});
            setSavedRecipes(response.data.savedRecipes);
            console.log(response);
        } catch(err) {
            console.error(err);
        }
    };
 
    // const isRecipeSaved = (id) => savedRecipes.includes(id);
    const isRecipeSaved = (id) => Array.isArray(savedRecipes) && savedRecipes.includes(id);

    return(
            <div>
                <h1 style={{marginTop:"50px",marginLeft:"20px"}}>Recipes</h1>
                <ul className="homerecipesmenu">
                    {recipes.map((recipe) => (
                        <li key={recipe._id} className="resipeShowScreen card" style={{padding:"10px"}}>
                            <div>
                                <h3>{recipe.name}</h3>
                                <h5>Author : {recipe.nameOfUserRecipe} </h5>
                                <button  className="btn btn-success" onClick={() => saveRecipe(recipe._id)} disabled={isRecipeSaved(recipe._id)} > {isRecipeSaved(recipe._id) ? "Saved" : "Save"}  </button>
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
                                         <div key={index}> <ol><li value={index + 1} >  {ingredient} </li></ol>  </div>
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
