import React,{useState, useEffect} from 'react'
import './AddRecipe.css'
import '../../pages/MainPage.css'
import Header from '../Header/Header'
import { MdClose } from "react-icons/md"
import axios from 'axios'

export default function AddRecipe({user, setUser}) {
    const [userInput, setUserInput] = useState({
        itemName: "",
        description: "",
        steps: "",
    })

    const handleChange = (e) => {
        setUserInput({
          ...userInput,
          [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        try{
            const response = await axios.post('/recipe/add', {
                imageUrl: imageSrc,
                itemName: userInput.itemName,
                description: userInput.description,
                ingredients: tagList,
                steps: userInput.steps,
                user: JSON.parse(localStorage.getItem("user"))
            })
            alert(response.data)
        } catch(error) {
            console.err(error)
        }
    };
    const [tag, setTag] = useState({
        name: "",
        quantity: "",
        measure: ""
    });
    const [tagList, setTagList] = useState([])

    const handleTagSubmit = (e) => {
        if(e.key === "Enter") {
            if(tag.name === "") alert('Please enter item name')
            else if(!tag.quantity) alert('Please enter item quantity')
            else if(!tag.measure || tag.measure === "Select Measure") alert('Please enter item measure')
            else {
                setTagList([...tagList, tag])
                setTag({name: "", quantity: "", measure: ""})
            }
        }
    };

    const handleTagChange = (e) => {
        setTag({
          ...tag,
          [e.target.name]: e.target.value
        });
    };

    const removeTags = index => {
        setTagList([...tagList.filter(tag => tagList.indexOf(tag) !== index)]);
    };

    const [imageSrc, setImageSrc] = useState()
    const uploadImage = (e) => {
        const file = e.target.files[0]
        if(file.size > 204800) {
            alert("Cannot upload image greater than 200KB")
            return;
        }
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = function (e) {
            setImageSrc(reader.result)
        }
    }
    return (
        <>
        <div className="overlay-add-recipe"></div>
        <div className="main-page">
            <Header user={user} setUser={setUser}/>
            <div className="add-recipe-container">
                <div className="recipe-book-container">
                        <div className="page-1">
                            <div className="heading mb-4">
                                New Recipe
                            </div>
                            {   imageSrc ? 
                                <div className="item-image mb-3">
                                    <img className="img-tag" src={imageSrc} alt="item" />
                                    <div className="upload-again">
                                        <label className="upload-label">
                                            <input type="file" onChange={uploadImage} accept=".png,.jpg,.jpeg"/>
                                            Re-upload item image
                                        </label>
                                    </div>
                                </div>
                                :
                                <div className="item-image white-bg mb-3">
                                    <label className="upload-label mb-1">
                                        <input type="file" onChange={uploadImage} accept=".png,.jpg,.jpeg"/>
                                        Upload item image
                                    </label>
                                    <p>Image must be less than 200 KB</p>
                                </div>
                            }
                            <input type="text" className="recipe-book-input mb-3" placeholder="Enter Item Name..." name="itemName" value={userInput.itemName} onChange={handleChange} required/>
                            <textarea rows="5" className="recipe-book-input" placeholder="Enter Description..." name="description" value={userInput.description} onChange={handleChange} required/>
                        </div>
                        <div className="page-2">
                            <div className="ingredient-title mb-2">Ingredients</div>
                            <div className="ingredient-input mb-2">
                                    <input type="text" className="name" name="name" placeholder="Items used..." value={tag.name} onChange={handleTagChange} onKeyDown={handleTagSubmit} autoComplete="off"/>
                                    <input type="number" step="0.1" className="quantity" name="quantity" placeholder="0"  value={tag.quantity} onChange={handleTagChange} onKeyDown={handleTagSubmit}/>
                                    <select className="measure" name="measure" value={tag.measure} onChange={handleTagChange} onKeyDown={handleTagSubmit}>
                                        <option hidden>Select Measure</option>    
                                        <option>Teaspoon</option>
                                        <option>Tablesppon</option>
                                        <option>Cup</option>
                                        <option>Pinch</option>
                                        <option>Pieces</option>
                                        <option>Litres</option>
                                        <option>Grams</option>
                                        <option>Kilograms</option>
                                        <option>As per taste</option>
                                    </select>
                            </div>
                            <div className="final-ingredient-taglist mb-3" id="final-ingredient-taglist">
                                {
                                tagList.length > 0 
                                ?
                                tagList.map((tag, index) => (
                                    <div className="single-tag" key={index}>
                                        <span>{tag.name}</span>
                                        <i onClick={() => removeTags(index)}>
                                            <MdClose />
                                        </i>
                                    </div>
                                ))
                                :
                                "Your ingredient list will appear here..."
                                }
                            </div>
                            <div className="ingredient-title mb-2">Steps</div>
                            <textarea rows="7" className="recipe-book-input" placeholder="Enter steps to cook..." name="steps" value={userInput.steps} onChange={handleChange} required/>
                            <a href="/"><button className="btn btn-success" onClick={handleSubmit}>Add My Recipe</button></a>
                        </div>
                </div>
            </div>
        </div>
        </>
    )
}