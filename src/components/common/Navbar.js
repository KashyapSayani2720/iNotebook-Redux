import React from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { noteApi } from '../../services/note';

function Navbar() {

    const dispatch = useDispatch();

    
    const navigate = useNavigate();
    
    function handleLogout(){
        localStorage.removeItem("token");
        dispatch(noteApi.util.invalidateTags(['note']));
        navigate("/login");
    }

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">Navbar</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem("token") &&
                            <>
                                <Link type="button" className="btn btn-primary ms-5" to="/login">Login</Link>
                                <Link type="button" className="btn btn-primary ms-3" to="/register">Register</Link>
                            </>
                        }
                        {localStorage.getItem("token") &&
                            <>
                                <Link type="button" onClick={handleLogout} className="btn btn-primary ms-5" to="/login">Logout</Link>
                            </>
                        }
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
