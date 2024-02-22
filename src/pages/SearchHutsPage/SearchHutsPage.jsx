import React, { useEffect, useState } from 'react'
import {searchForHuts} from '../../utilities/users-services';

function SearchHutsPage(props) {
  const [searchVal, setSearchVal] = useState('');
  const [results, setResults] = useState([]);
  useEffect(()=>{console.log(results)},[results]);

  const getHutData = async()=>{
    try{
      //console.log(searchVal);
      //console.log("implement search through infrastructure");
      const res = await searchForHuts(searchVal);
      console.log("res:", res);
      setResults(res);
      //console.log(results);

    }catch(e){
      console.log(e);
    }
  }


  return (
    <div>
      <h1>Who Are We Looking For?</h1>
      <p>Find a hut by its owner name</p>
      <input 
        className='search-huts-page-input' 
        type='text' 
        onChange={(evt)=>{
          setSearchVal(evt.target.value)
          getHutData();
        }}
      />
      {/* <button type="button" onClick={getHutData}>Search</button> */}
      <br></br>
      {
        results.length 
        ?
        results.map((item)=>{
          return(
            <span>
            <a href = {`/huts/${item.name}`}>{item.name}</a>
            <br></br>
            </span>
          )
        })
        :
          searchVal=='' 
          ?
          <p>Let's find some huts. Start typing above!</p>
          :
          <p>Can't find that one...</p>
      }
    </div>
  )
}

export default SearchHutsPage