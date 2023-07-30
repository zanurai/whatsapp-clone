import React from 'react'
import { useNavigate } from 'react-router-dom'

const Userprofile = ({ name, photURL, email, lastMessage }) => {//using props from sidebar sidebar is parent component of userprofile
    const navigate = useNavigate();
    const goToUser = (emailID) => {//emailID is as a argument 
        if (emailID) {//yadi emailID chai(null or undefined navayama)yadi yo exist vaya yesle navigate use garxa useNavigate bata
            navigate(`/${emailID}`)
        }
    }
    return (
        <div className="userprofile" onClick={() => goToUser(email)}>
            {/*image of user*/}

            <div className="userimg">
                <img src={photURL} alt=""></img>

                {/*name of user*/}
                <div className="userinfo">
                    <p className="username">{name}</p>{/*yadi lastmessage  chai true vaya <p> name render hunxa navaya skipped hunxa </p>*/}
                    {lastMessage && <p className="user-lastmessage">{lastMessage}</p>}
                </div>
            </div>
        </div>
    )
}

export default Userprofile
