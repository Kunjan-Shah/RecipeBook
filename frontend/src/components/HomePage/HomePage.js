import React, {useState, useEffect} from 'react'
import './HomePage.css'
import '../../pages/MainPage.css'
import Header from '../Header/Header'
import SearchBar from '../SearchBar/SearchBar'
import RecipeCarousel from '../RecipeCarousel/RecipeCarousel'
import SearchResults from '../SearchResults/SearchResults'
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader'
import axios from 'axios'

const BACKEND_URL = "https://recipebook-backend-nu2n.onrender.com"

export default function HomePage({user, setUser}) {
    const [searchList, setSearchList] = useState();
    useEffect(() => {
        async function fetchAllIngredients() {
            try {
                let masterSearchList = []
                let recipesObj = await axios.get(BACKEND_URL + "/recipe/all")
                recipesObj = recipesObj.data
                for(let i = 0; i < recipesObj.length; i++) {
                    masterSearchList.push(recipesObj[i].itemName)
                }
                setSearchList(masterSearchList)
            } catch(error) {
                console.log(error)
            }
        }
        fetchAllIngredients()
    }, [])
    const [matchedRecipes, setMatchedRecipes] = useState()
    useEffect(() => {
        if(matchedRecipes && matchedRecipes.length > 0) {
            document.getElementById('search-results').scrollIntoView({ block: 'start', behavior: 'smooth' });
        }
    }, [matchedRecipes])
    
    return (
        searchList ?
        <>
        <div className="overlay-mainpage"></div>
        <div className="main-page">
            <div style={{height: "100vh"}}>
                <Header user={user} setUser={setUser}/>
                <div className="homepage-container">
                    <div className="searchbar-container">
                        <div className="search-title mb-3">
                            What's on your mind today?
                        </div>
                        <SearchBar searchList={searchList} setMatchedRecipes={setMatchedRecipes}/>
                        <Link to="/add-recipe">
                            <div className="add-recipe-btn">
                                Add my own recipe
                            </div>
                        </Link>
                    </div>
                    <div className="carousel-container">
                        <div className="carousel-title mb-3">
                            Popular Recipes
                        </div>
                        <RecipeCarousel />
                    </div>
                </div>
            </div>
            {   matchedRecipes && matchedRecipes.length > 0 ? 
                <SearchResults matchedRecipes={matchedRecipes}/>
                :
                ""
            }
        </div>
        </>
        :
        <Loader />
    )
}
