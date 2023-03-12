import React from 'react'
import './SearchResults.css'
import RecipeCard from '../RecipeCard/RecipeCard'
import { Link } from 'react-router-dom';



export default function SearchResults({matchedRecipes}) {
    console.log("No of recipes ", matchedRecipes.length)
    return (
        <div id="search-results">
            <div className="result-container">
                <div className="title">
                    Search Results
                </div>
                <div className="result-list-container">
                    {   matchedRecipes && matchedRecipes.length > 0 ? 
                        matchedRecipes.map((recipe, index) => (
                            index % 3 === 0 ? 
                                <div className="result-list-row">
                                    <Link to={`/recipe/${recipe._id}`}><RecipeCard className="card-shadow" recipe={recipe} key={index} /></Link>
                                    {index+1 < matchedRecipes.length ? <Link to={`/recipe/${matchedRecipes[index+1]._id}`}><RecipeCard className="card-shadow" recipe={matchedRecipes[index+1]} key={index+1} /></Link> : ""}
                                    {index+2 < matchedRecipes.length ? <Link to={`/recipe/${matchedRecipes[index+2]._id}`}><RecipeCard className="card-shadow" recipe={matchedRecipes[index+2]} key={index+2} /></Link> : ""}
                                </div>
                            :
                            ""
                        ))
                        :
                        ""
                    }
                </div>
            </div>
        </div>
    )
}