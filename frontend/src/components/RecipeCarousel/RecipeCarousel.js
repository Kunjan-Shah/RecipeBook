import React, {useState, useEffect} from 'react'
import './RecipeCarousel.css'
import RecipeCard from '../RecipeCard/RecipeCard'
import axios from 'axios'
import { Link } from 'react-router-dom';


export default function RecipeCarousel() {
    const [recipeList, setRecipeList] = useState();
    useEffect(() => {
        async function fetchTopRecipes() {
            try {
                let recipesObj = await axios.get("/recipe/top")
                recipesObj = recipesObj.data
                // fetch top 3 recipes
                recipesObj = recipesObj.slice(0, 3)
                setRecipeList(recipesObj)
            } catch(error) {
                console.log(error)
            }
        }
        fetchTopRecipes()
    }, [])

    
    return (
        recipeList ?
        <div className="recipe-carousel">
            <div id="recipeCarouselControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                    <Link to={`/recipe/${recipeList[0]._id}`}><RecipeCard recipe={recipeList[0]} className=""/></Link>
                    </div>
                    {   recipeList.length > 1 ? 
                        <div className="carousel-item">
                            <Link to={`/recipe/${recipeList[1]._id}`}><RecipeCard recipe={recipeList[1]} className=""/></Link>
                        </div>
                        : 
                        ""
                    }
                    {   recipeList.length > 2 ?
                        <div className="carousel-item">
                            <Link to={`/recipe/${recipeList[2]._id}`}><RecipeCard recipe={recipeList[2]} className=""/></Link>
                        </div>
                        :
                        ""
                    }
                    
                </div>
                <a className="carousel-control-prev" href="#recipeCarouselControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#recipeCarouselControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        </div>
        :
        ""
    )
}
