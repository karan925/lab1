import React from 'react'

function SearchBar({placeholder, data}) {
  return (
    <div class = "search">
        <div class = "SearchBar">
            <input type = "text" placeholder={placeholder}/>
        <div class = "results"></div>
        </div>
        </div>
  )
}

export default SearchBar