import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <nav>
                <ul>
                    <a>
                        <button><Link to="/login">Login</Link></button>
                    </a>
                    <a>
                        <Link to="/register">Register</Link>
                    </a>
                </ul>
            </nav>
            <div>
                <h1>Welcome to What to Cook</h1>
            </div>
        </div>
    )
}

export default Home