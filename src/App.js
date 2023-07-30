import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Chat from './components/Chat';
import Home from './components/Home';
import { useState } from 'react';
import Login from './components/Login';
//import { auth } from 'firebase-admin';
import { auth } from './firebase';
const App = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));//jsontostringfy lai obj ma change garna//if the user present in the localstroage it initiliaze the value
  //initialize gare user ko value chai JSON.parse browser ko key chai localstrorage
  console.log(user)
  //json parse wala//login gare google sanga hami banako app ma khulxa but paxi reload garda feri tai login page ma janxa so teslai hatauna
  //for logout
  const signOut = () => {
    auth.signOut()
      .then(() => {
        setUser(null)
        localStorage.removeItem('user')//localstroage bata userlai hataunu paryo
      })
      .catch((err) => alert(err.message))
  }
  return (
    <Router>
      <div className="App">
        {
          user ? (<Routes>
            <Route exact path="/:emailID" element={<Chat currentUser={user} signOut={signOut} />} />{/*userlai all pagema pass garne*/}
            <Route exact path="/home" element={<Home currentUser={user} signOut={signOut} />} />
          </Routes>) : (<Login setUser={setUser} />//setuserlai as a props method bata pathako
          )}
      </div>
    </Router>
  );
}

export default App;
