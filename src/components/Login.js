import React from 'react'
import db, { auth, googleProvider } from '../firebase'
import { useNavigate } from 'react-router-dom'

const Login = ({ setUser }) => {//setuser is props app bata aako props
    const navigate = useNavigate() //euta page bata arko page ma chalaunalai//this the center feature of web application
    //authantication with google
    const signInWithGoogle = () => {//function name
        auth.signInWithPopup(googleProvider)// auth.signInWithPopup google acc sanga sign in hunxa
            .then((result) => {
                const newUser = {//jaba userle signin successfully garxa yesle newuser create garxa junchai obj sanga
                    fullname: result.user.displayName,//obj hun tintai
                    email: result.user.email,
                    photURL: result.user.photoURL
                }
                navigate('/')//home ma navigate garna navigate vanya chalaunu google ko same id bata whatsapp chalaunu app bata navigate garnu
                setUser(newUser)//setUser le newUserlai set garyo
                //login gare google sanga hami banako app ma khulxa but paxi reload garda feri tai login page ma janxa so teslai hatauna
                localStorage.setItem('user', JSON.stringify(newUser))//userko information chai localstorage ma save hareko
                db.collection("users").doc(result.user.email).set(newUser)//collection is similar as folder// doc is one type of object
            })
            .catch((err) => alert(err.message))
    }
    return (
        <div className="login">
            <div className="login-container">
                <img src="whatsapp.png" alt=""></img>
                <p className="login-name">whatsapp Web</p>
                <button className="lohin-btn" onClick={signInWithGoogle}><img src="search.png" alt='lohin with facebook'></img> <p>Login with Google</p></button>
            </div>

        </div>
    )
}

export default Login