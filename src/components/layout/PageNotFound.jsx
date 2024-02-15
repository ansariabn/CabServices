import React from 'react';
import {Link} from "react-router-dom"

const PageNotFound = ()=>{
    return(
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <div className="text-center">
                        <h1>404</h1>
                        <h2>Page Not Found</h2>
                        <Link to="/">Go Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PageNotFound