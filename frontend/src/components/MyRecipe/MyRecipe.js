import React, {useEffect, useState} from 'react'
import './MyRecipe.css'
import '../../pages/MainPage.css'
import Header from '../Header/Header'
import RecipeCard from '../RecipeCard/RecipeCard'
import axios from 'axios'
import { Link } from 'react-router-dom';
const BACKEND_BASE_URL = 'http://localhost:4000';


export default function MyRecipe({user, setUser}) {
    const [myRecipes, setMyRecipes] = useState([])
    useEffect(() => {
        async function fetchData() {
            try {
                let myRecipesObj = await axios.get(BACKEND_BASE_URL + '/recipe/my-recipes', {
                    params: {
                        user: user
                    }
                })
                myRecipesObj = myRecipesObj.data
                setMyRecipes(myRecipesObj)
            } catch(error) {
                console.log(error)
            }
        }
        fetchData()
    }, [user])
    
    return (
        <>
        <div className="overlay-myrecipe"></div>
        <div className="main-page">
            <Header user={user} setUser={setUser}/>
            <div className="myrecipe-container">
                <div className="title">
                    My Recipes
                </div>
                <div className="top-text">
                    {myRecipes.length > 0 ? `Great! You have contributed ${myRecipes.length} recipes` : "You have not yet contributed"}
                </div>
                <div className="recipe-list-container">
                    {
                        myRecipes.map((recipe, index) => (
                            index % 3 === 0 ? 
                                <div className="recipe-list-row">
                                    <Link to={`/recipe/${recipe._id}`}><RecipeCard className="card-shadow" recipe={recipe} key={index} /></Link>
                                    {index+1 < myRecipes.length ? <Link to={`/recipe/${myRecipes[index+1]._id}`}><RecipeCard className="card-shadow" recipe={myRecipes[index+1]} key={index+1} /></Link> : ""}
                                    {index+2 < myRecipes.length ? <Link to={`/recipe/${myRecipes[index+2]._id}`}><RecipeCard className="card-shadow" recipe={myRecipes[index+2]} key={index+2} /></Link> : ""}
                                </div>
                            :
                            ""
                        ))
                    }
                </div>
                <div className="footer-text">
                    and more coming soon...
                </div>
            </div>
        </div>
        </>
    )
}