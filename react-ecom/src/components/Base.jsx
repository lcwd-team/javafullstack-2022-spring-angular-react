import React from 'react'
import CustomNavbar from './CustomNavbar'

function Base({children}) {
  return (
    <div>
        <CustomNavbar/>

       <div  style={{marginTop:'62px'}}>
       {children}
       </div>

        

    </div>
  )
}

export default Base