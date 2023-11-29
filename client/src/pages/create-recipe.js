import { useEffect, useState } from "react";
import axios from 'axios';
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import {useCookies } from "react-cookie";

export const CreateRecipe = () =>{
    
    
    
    const [cookies, _] = useCookies(["access_token"]);
    const userID = useGetUserID();

    const [recipe, setRecipe] = useState({
        name: "",
        ingredients: [],
        instructions: "",
        imageUrl: "",
        cookingTime: 0,
        userOwner: userID,
        nameOfUserRecipe:""
    }); 

    const navigate = useNavigate();

    useEffect(() => {
        if((userID === "undefined") || (userID === null)){
            navigate("/auth");
        }
    },[])



    const handleChange = (event) => {
        const {name , value} = event.target;
        setRecipe({...recipe, [name]:value});
    };

    const handleIngredientChange = (event, idx) => {
        const { value } = event.target;
        const ingredients = recipe.ingredients ;
        ingredients[idx] = value;
        setRecipe({ ...recipe, ingredients });
    };

    const addIngredients = () => {
        setRecipe({...recipe,ingredients:[...recipe.ingredients,""]});
    };

    const onSubmit = async (event) => {
        event.preventDefault();
        try{
            await axios.post("http://localhost:3001/recipes",recipe,{headers:{authorization:cookies.access_token}});
            alert("Recipe Created");
            navigate("/");
        } catch(err) {
            console.error(err);
        }
    };

    // console.log(recipe);

    return (
        <div className="create-recipe">
        <h2>Create Recipe</h2>
        <form onSubmit={onSubmit} >
          <label htmlFor="name" >Name</label>
          <input type="text"  id="name"  name="name" className="form-control" placeholder="Food Name" onChange={ handleChange } />
          <label htmlFor="ingredients">Ingredients</label>
          {recipe.ingredients.map((ingredient,idx) => (
            <input key={idx} type="text" name="ingredients" placeholder={`ingredient Number ${idx + 1}`} className="form-control" value={ingredient} onChange={(event) => handleIngredientChange(event,idx)} />
          ))}

          <button onClick={addIngredients} className="btn btn-success" type="button"> Add Ingredients</button>
          <label htmlFor="instructions">Instructions</label>
          <textarea id="instructions"  name="instructions" placeholder="Write Here Your Instructions" className="form-control" onChange={ handleChange } ></textarea>
          <label htmlFor="imageUrl">Image URL</label>
          <input type="text" id="imageUrl"  name="imageUrl" placeholder="Image URL Here" className="form-control" onChange={ handleChange } />
          
          <label htmlFor="nameOfUserRecipe">name Of User Recipe</label>
          <input type="text" id="nameOfUserRecipe"  name="nameOfUserRecipe" placeholder="nameOfUserRecipe" className="form-control" onChange={ handleChange } />
          
          
          <label htmlFor="cookingTime">Cooking Time (minutes)</label>
          <input  type="number" id="cookingTime" placeholder="Cooking Time" name="cookingTime" className="form-control"  onChange={ handleChange }  />
          <button type="submit" className="btn btn-success" > Create Recipe</button>
        </form>
      </div>
    );     
};