import { auth } from '../firebase'
import React from 'react'

const ChatMesssage = ({ message, time, sender }) => {//child of chatcontainer parent chatcontainer bata aako
    return (
        <div className="chat-message"
            style={{
                alignSelf: sender === auth.currentUser.email ? "flex-end" : "flex-start",//yadi sender chai auth.current.email sanga equall xa vane flexend ma janxa navaya flexstart ma basxa
                backgroundColor: sender === auth.currentUser.email ? "lightgreen" : "white"
            }}>{/*text left ma thiyo rightma lageko  // :(else vany ho )*/}
            <div className="chat-text">
                <p>{message}</p>
            </div>
            <div className="chat-date">
                <p>{new Date(time.toDate()).toLocaleString()}</p>{/*tolocalstring le chai current locale setting of user's computer  use garera date ra time ko value represent garxa*/}
            </div>
        </div>
    )
}

export default ChatMesssage
