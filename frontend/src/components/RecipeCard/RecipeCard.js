import React from 'react'
import ProfileAvatar from '../ProfileAvatar/ProfileAvatar'
import './RecipeCard.css'


export default function RecipeCard({className, recipe}) {
    return (
        <div className={"recipe-card " + className}>
            <div className="image">
                <img src={recipe.imageUrl} alt="item"/>
            </div>
            <div className="content">
                <div style={{height: "100%"}}>
                    <div className="title">
                        {recipe.itemName}
                    </div>
                    <div className="votes">
                    <span className="material-symbols-outlined">thumb_up</span><span className="numeric-vote mr-3">{recipe.upvotes}</span>
                    <span className="material-symbols-outlined">thumb_down</span><span className="numeric-vote">{recipe.downvotes}</span>
                    </div>
                    <div className="description text-overflow">
                        <div>{recipe.description}</div>
                    </div>
                </div>
                <div className="footer">
                    <div className="mr-1">
                        <ProfileAvatar name={recipe.author.name} size={25} fontSize="1rem"/>
                    </div>
                    <div className="font-weight-bold">{recipe.author.name}</div>
                </div>
            </div>
        </div>
    )
}
