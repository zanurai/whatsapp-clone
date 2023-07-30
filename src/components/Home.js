import React from 'react'
import Sidebar from './Sidebar'

const Home = ({ currentUser, signOut }) => {//currentUser and signout are props app bataaako props
    return (
        <div className="home">
            <div className='home-container'>{/*siderbarlai render garxa*/}
                {/*sidebar*/}
                <Sidebar currentUser={currentUser} signOut={signOut} />
                <div className="home-bg">
                    <img src="whatsapp2.png" alt=""></img>
                </div>
            </div>
        </div>
    )
}

export default Home
