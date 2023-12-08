import React from 'react'
import Header from './Header';
import Footer from './Footer';

function Home() {
    
    return (
        <div style={{textAlign:'center'}}>
            <Header/>
            <div>
                <h1>Welcome to What to Cook</h1>
            </div>
            <Footer/>
        </div>
    )
}

export default Home