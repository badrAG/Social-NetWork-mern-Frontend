import React from 'react'
import NavBar from '../components/navbar/Navbar'
import Posts from '../components/posts/Posts'
function Menu() {
    return (
        <>
        <NavBar/>
      <div className="row">
        <div className="col-md-6 ms-12 offset-md-3">
          <Posts/>
          <Posts/>
          <Posts/>
          <Posts/>
        </div>
      </div>
        </>
    )
}

export default Menu
