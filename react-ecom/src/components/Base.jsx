import React from 'react'
import CustomNavbar from './CustomNavbar'

function Base({children}) {
  return (
    <div>
        <CustomNavbar/>

        {children}

        

    </div>
  )
}

export default Base