import React from 'react'
import Sidebar from './Sidebar'
import ChatContainer from './ChatContainer'


//chat.js is rendering the sidebar and chatcontainer
const Chat = ({ currentUser, signOut }) => {//this two props is for chat top user app bata aako props
    return (
        <div className="Chat">
            <div className="chat-content">
                <Sidebar currentUser={currentUser} signOut={signOut} />
                <ChatContainer currentUser={currentUser} />
            </div>

        </div>
    )
}

export default Chat





// import React, { useEffect, useState } from 'react'
// import firebase from '../firebase'
// const Chat = ({ route }) => {
//     const { chatID } = route.params;
//     const [message, setMessage] = useState([]);

//     useEffect(() => {
//         const chatRef = firebase.database().ref(`chats/${chatID}`)
//         chatRef.on('value', (snapsort) => {
//             const chatData = snapsort.val()
//             setMessage(chatData.message || [])
//         })
//         return () => chatRef.off()
//     }, [chatID])
//     return (
//         <div>
//             {message.map((messages) => (
//                 <p key={messages.id}>{messages.text}</p>
//             ))}
//         </div>
//     )
// }

// export default Chat
