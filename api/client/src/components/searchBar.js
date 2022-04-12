// import React from 'react'

// function SearchBar({placeholder, data}) {
//   return (
//     <div class = "search">
//         <div class = "SearchBar">
//             <input type = "text" placeholder={placeholder}/>
//             <button type = "submit">Search</button>
//         <div class = "results"></div>
//         </div>
//         </div>
//   )
// }

// export default SearchBar
import React from "react";
import { MDBCol, MDBFormInline, MDBIcon } from "mdbreact";

const SearchBar = () => {
  return (
    <MDBCol md="6">
      <MDBFormInline className="md-form">
        <MDBIcon icon="search" />
        <input className="form-control form-control-sm ml-3 w-75" type="text" placeholder="Search" aria-label="Search" />
      </MDBFormInline>
    </MDBCol>
  );
}

export default SearchBar;