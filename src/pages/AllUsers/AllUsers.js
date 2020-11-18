import { Avatar, Link } from '@material-ui/core'
import React from 'react'

function AllUsers() {
    return (
        <div className="row">
        <div className="row">
            <div className="col-md-12 ms-6">
                <div className="users__title">
                    <h6>Suggestions For You</h6>
                </div>
            </div>
        </div>
        <div className="row">
            <div className="d-flex ml-4 align-items-center users__content">
                <div className="user_avatar">
                <Avatar/>
            </div>
            <div className=" ml-2 user__name">
                <h6>@badrag</h6>
                <p>badr ag</p>
            </div>
            </div>
           <div className="col-md-10 ms-10 cepar__users"></div>

        </div>
        <div className="row">
            <div className="col-md-10 offset-2 ms-8 user__more">
                <Link to="/">Show More</Link>
            </div>
        </div>
    </div>
    )
}

export default AllUsers
