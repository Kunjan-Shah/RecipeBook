import React, {useState, useEffect} from 'react'
import './Recipe.css'
import Header from '../Header/Header'
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'
import '../../pages/MainPage.css'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import { Link } from 'react-router-dom';

const BACKEND_BASE_URL = 'http://localhost:4000';


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Recipe({user, setUser}) {
    const {id} = useParams();
    const [recipe, setRecipe] = useState();
    useEffect(() => {
        async function fetchRecipe() {
            try {
                let recipeObj = await axios.get(BACKEND_BASE_URL + `/recipe/${id}`)
                recipeObj = recipeObj.data
                setRecipe(recipeObj)
            } catch(error) {
                console.log(error)
            }
        }
      fetchRecipe()
    }, [])
    const [vote, setVote] = useState({
        upvotes: false,
        downvotes: false
    })

    async function updateVotes(voteStatus) {
        try {
            await axios.post(BACKEND_BASE_URL + "/recipe/update-votes", {
                voteStatus: voteStatus,
                recipeId: recipe._id
            })
        } catch(error) {
            console.log(error)
        }
    }

    const handleChange = (e) => {
        if(e.target.id === "upvotes") {
            if(vote.upvotes == true) {
                updateVotes({upAdd: -1, downAdd: 0})
            }
            else if(vote.downvotes == true){
                updateVotes({upAdd: 1, downAdd: -1})
            }
            else if(vote.upvotes == false && vote.downvotes == false) {
                updateVotes({upAdd: 1, downAdd: 0})
            }
            setVote({upvotes: (vote.upvotes  == true) ? false : true, downvotes: false})
        } else {
            if(vote.upvotes == true) {
                updateVotes({upAdd: -1, downAdd: 1})
            }
            else if(vote.downvotes == true){
                updateVotes({upAdd: 0, downAdd: -1})
            }
            else if(vote.upvotes == false && vote.downvotes == false) {
                updateVotes({upAdd: 0, downAdd: 1})
            }
            setVote({upvotes: false, downvotes: (vote.downvotes  == true) ? false : true})
        }
    };

    async function deleteRecipe() {
        try {
            await axios.post(BACKEND_BASE_URL + "/recipe/delete", {
                id: recipe._id
            })
        } catch(error) {
            console.log(error)
        }
    }
    
    return (
        recipe ? 
        <>
        <div className="overlay-recipe"></div>
        <div className="main-page">
            <div className="recipe-landing-page">
                <Header user={user} setUser={setUser}/>
                <div className="recipe-banner-container">
                    <div className="item-image">
                        <img src={recipe.imageUrl} alt="item" />
                    </div>
                    <div className="recipe-title">
                        {recipe.itemName}
                    </div>
                </div>
            </div>
            <div className="method-container">
                <div className="left-box">
                    <div className="description">
                        <div className="text">{recipe.description}
                        </div>
                        <div className="author">
                            <ProfileAvatar name={recipe.author.name} size={25} fontSize={"1rem"}/>
                            <div className="ml-2">{recipe.author.name}</div>
                        </div>
                    </div>
                    <div className="rate mt-3">
                        <span className="mr-3">Rate this recipe: </span>
                        {
                            vote.upvotes ? 
                            <i className="material-icons mr-2" id="upvotes" onClick={handleChange}>thumb_up</i>
                            :
                            <span className="material-symbols-outlined mr-2" id="upvotes" onClick={handleChange}>thumb_up</span>
                        }
                        {
                            vote.downvotes ? 
                            <i class="material-icons" id="downvotes" onClick={handleChange}>thumb_down</i>
                            :
                            <span className="material-symbols-outlined" id="downvotes" onClick={handleChange}>thumb_down</span>
                        }
                    </div>
                    <div className="steps mt-4">
                        <div className="title">
                            Steps
                        </div>
                        <div className="text">
                            {recipe.steps}
                        </div>
                    </div>
                    {   // show admin controls only if user is author
                        user._id === recipe.author._id ? 
                        <div className="admin-controls mt-5">
                            <a href="/"><button className="btn btn-danger" onClick={deleteRecipe}>Delete Recipe</button></a>
                            <Link to={`/edit/${recipe._id}`}><button className="btn btn-success">Edit Recipe</button></Link>
                        </div>
                        :
                        ""
                    }
                </div>
                <div className="ingredient-box">
                    <div className="ingredient-content-box">
                        <div className="heading">
                            Ingredients
                        </div>
                        <div className="ingredient-list">
                            {
                                recipe.ingredients.map((item, index) => (
                                    <div className="ingredient-item">
                                        <div className="item-name">
                                            <span className="material-symbols-outlined mr-1">check</span> <div>{capitalizeFirstLetter(item.name)}</div>
                                        </div>
                                        <div className="quantity">
                                            {(item.quantity === 0 ? "" : item.quantity) + " " + item.measure}
                                         </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
        :
        "Loading..."
    )
}