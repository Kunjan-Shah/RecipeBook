import React,{useState, useEffect} from 'react'
import './AddRecipe.css'
import '../../pages/MainPage.css'
import Header from '../Header/Header'
import { MdClose } from "react-icons/md"
import axios from 'axios'
import { useParams } from 'react-router-dom';
const BACKEND_BASE_URL = 'http://localhost:4000';

export default function AddRecipe({user, setUser, isEdit}) {
    const {id} = useParams();
    const [userInput, setUserInput] = useState({
        itemName: "",
        description: "",
        steps: "",
    })
    // get recipe if isEdit==true
    useEffect(() => {
        async function fetchRecipe() {
            try {
                let recipeObj = await axios.get(BACKEND_BASE_URL + `/recipe/${id}`)
                recipeObj = recipeObj.data
                setUserInput({itemName: recipeObj.itemName, description: recipeObj.description, steps: recipeObj.steps})
                setTagList(recipeObj.ingredients)
            } catch(error) {
                console.log(error)
            }
        }
        if(isEdit) fetchRecipe()
    }, [])

    const handleChange = (e) => {
        setUserInput({
          ...userInput,
          [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        try{
            if(isEdit) {
                const response = await axios.post(BACKEND_BASE_URL + '/recipe/update', {
                    recipeId: id,
                    itemName: userInput.itemName,
                    description: userInput.description,
                    ingredients: tagList,
                    steps: userInput.steps,
                })
                alert(response.data)
            }
            else {
                const response = await axios.post(BACKEND_BASE_URL + '/recipe/add', {
                    itemName: userInput.itemName,
                    description: userInput.description,
                    ingredients: tagList,
                    steps: userInput.steps,
                    user: JSON.parse(localStorage.getItem("user"))
                })
                alert(response.data)
            }
        } catch(error) {
            console.log(error)
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

    const [selectedFile, setSelectedFile] = useState();
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
                            <div className="item-image mb-3">
                                <input type="file" onChange={(e) => setSelectedFile(e.target.files[0])} accept=".png,.jpg,.jpeg"/>
                                {/* <FileUploaded onFileSelectSuccess={(file) => setSelectedFile(file)} onFileSelectError={({ error }) => alert(error)} /> */}
                            </div>
                            
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
                            {   !isEdit ?
                                <a href="/"><button className="btn btn-success" onClick={handleSubmit}>Add My Recipe</button></a>
                                :
                                <a href="/"><button className="btn btn-success" onClick={handleSubmit}>Update My Recipe</button></a>
                            }
                        </div>
                </div>
            </div>
        </div>
        </>
    )
}