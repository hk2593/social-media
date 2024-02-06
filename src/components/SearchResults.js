import React from 'react'

const SearchResults = ({searchResults}) => {
    console.log("mere paas yeh aaya",searchResults);
  return (
    <div style={{marginTop:"60px"}}>
      <ul className="suggestions">
                  {searchResults.map((result, index) => (
                    <li key={index} className="list-group-item" style={{cursor:"pointer"}} onClick={() => window.location.href = `/userProfile/${result._id}`}>
                     <b>{result.fullName}</b> 
                    </li>
                  ))}
                </ul>
    </div>
  )
}

export default SearchResults;
