import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import './SearchBar.css'
import axios from 'axios'

const BACKEND_URL = "https://recipebook-backend-nu2n.onrender.com"

export default function SearchBar({searchList, setMatchedRecipes}) {
  const [value, setValue] = useState();
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = async (e) => {
    if(e.key === "Enter") {
        try {
            setInputValue('')
            let matchedRecipeObj = await axios.get(BACKEND_URL + '/recipe/search', {
                params: {
                    itemName: inputValue
                }
            })
            matchedRecipeObj = matchedRecipeObj.data
            // remove duplicates
            // matchedRecipeObj = matchedRecipeObj.filter((value, index) => {
            //   const _value = JSON.stringify(value);
            //   return index === matchedRecipeObj.findIndex(obj => {
            //     return JSON.stringify(obj) === _value;
            //   });
            // });
            if(!matchedRecipeObj || matchedRecipeObj.length === 0) alert('No results found')
            setMatchedRecipes(matchedRecipeObj)
        } catch(error) {
            console.log(error);
        }
    }
  };
  return (
    <div className="search-bar">
              <Autocomplete
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                  setInputValue(newInputValue);
                }}
                id="search-input"
                options={searchList}
                sx={{ width: "100%", height: "100%"}}
                renderInput={(params) => (
                  <div ref={params.InputProps.ref} style={{height: "100%", display: "flex", alignItems: "center"}}>
                    <div className="icon">
                        <span className="material-symbols-outlined">search</span>
                    </div>
                    <div className="text-input">
                        <input type="text" {...params.inputProps} onKeyDown={handleSubmit}/>
                    </div>
                  </div>
                )}
              />
          </div>
  );
}