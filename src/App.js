import React, {useEffect, useState} from 'react';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import { Button } from 'react-bootstrap';
import Recipe  from './Recipe';

const App= ()=>{

  const App_Id ="25da1cb9";
  const App_key = 
  "43021a2314e48f71149a41e7319774aa";
   const [recipes, setRecipes] = useState([]);
   const [search, setSearch] = useState("");
   const [query, setQuery] = useState('chicken');

        useEffect(() => {
        getRecipes();
        },[query]);

const getRecipes= async () => {
  const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${App_Id}&app_key=${App_key}`);
    const data = await response.json();
   setRecipes(data.hits);
   console.log(data.hits);

    // alternative of loading date/fetching data from an api
    // fetch(`https://api.edamam.com/search?q=chicken&app_id=${App_Id}&app_key=${App_key}`).then(response =>{
    //   response.json();
    // })
}

  const updateSearch = e =>{
    setSearch(e.target.value);
    // console.log(search);
  }
  const  getSearch = e =>{
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }
  return(
        <div className='App'>
          <div className="container">
        <form onSubmit={getSearch} className="search-form">
          <input  className="search-bar" type="text" value={search} onChange={updateSearch} />
          <Button  className="search-button" type="submit"variant="primary" active >Search</Button>
         
        </form>
        <div className="recipes">
        {recipes.map(recipe =>(
          <Recipe  key={recipe.recipe.label}
              title={recipe.recipe.label}
              calories={recipe.recipe.calories} 
              image={recipe.recipe.image}
              ingredients = {recipe.recipe.ingredients}
           />
        ))}
        </div>
        </div>
        </div>
  );
}

export default App;
