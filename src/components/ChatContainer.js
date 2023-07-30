import React, { useEffect, useRef, useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import ChatMesssage from './ChatMesssage';
import EmojiPicker from 'emoji-picker-react';
import { useParams } from 'react-router-dom';
import db from '../firebase'
import firebase from 'firebase/compat/app'

//useState is the way to declear a variable
const ChatContainer = ({ currentUser }) => {//currentUser is props app.js bata aayako props

    const [message, setMessage] = useState("")
    const [openemojibox, setOpenemojibox] = useState(false)
    const { emailID } = useParams()
    const [chatUser, setChatUser] = useState({})
    const chatBox = useRef(null)//useRef is a hook which store whole refrence of any particular components inside a variable eg inputbox chatbox
    const [messageData, setMessageData] = useState([]);
    console.log("email >>>", emailID);

    useEffect(() => {//emailID ma based vaya user ko information firebased bata fetch garxa
        const getUser = async () => {
            const data = await db.collection('users').doc(emailID).onSnapshot((snapshot) => {
                console.log(snapshot.data())
                setChatUser(snapshot.data())
            });
        }
        const getMessages = async () => {//message lai fecth garxa
            const data = await db.collection('chats').doc(emailID).collection('messages').orderBy('timeStamp', 'asc').onSnapshot((snapshot) => {
                // if (snapshot.docs) {
                let messages = snapshot.docs.map((doc) => doc.data());
                let newMessage = messages.filter((message) =>
                    message.senderEmail === (currentUser.email || emailID) || message.receiverEmail === (currentUser.email || emailID)
                )
                setMessageData(newMessage)
                //}
            }) //example bata message grap garne 
        }
        getUser()
        getMessages()
    }, [emailID])//yaha yo rakhesi mathiko function re-render hunxa
    console.log("message>>", messageData)// yo useeffect chai emailID chage vako bela call hunxa
    //for auto scrolling
    useEffect(() => {//auto scroll ma kam garxa jaba hami message add garxau auto scroll afai hunxa msgko
        console.log("chatbox>>", chatBox)

        chatBox.current.addEventListener('DOMNodeInserted', (event) => {
            const { currentTarget: target } = event;
            target.scroll({ top: target.scrollHeight, behavior: "smooth" })
        })

    }, [messageData])

    const send = (e) => {//yo function le chai message chat ma message pathaune kam garxa josle firebase database ma pani msg add garne kam garxa
        e.preventDefault()

        if (emailID) {//if emailID chai truely vaya userlai msg pathauxa specified email address sanga
            let payload = {
                text: message,
                senderEmail: currentUser.email,
                receiverEmail: emailID,
                timeStamp: firebase.firestore.Timestamp.now()

            }
            console.log(payload)
            //sender
            db.collection('chats').doc(currentUser.email).collection('message').add(payload)//add the mesasageboth sender and recvier
            //reciver
            db.collection('chats').doc(emailID).collection('messages').add(payload)



            //add user to sender
            db.collection('friendlist').doc(currentUser.email).collection('list').doc(emailID).set({//add the user to other friends
                //query le chai recvier lai sender friend list ma add f=garxa
                email: chatUser.email,
                fullname: chatUser.fullname,
                photURL: chatUser.photURL,
                lastMessage: message
            });
            //main userlai chat vitra ko user ma add garne
            db.collection('friendlist').doc(emailID).collection('list').doc(currentUser.email).set({//query le chai sender lai reciverko friendlist ma add garxa
                email: currentUser.email,
                fullname: currentUser.fullname,
                photURL: currentUser.photURL,
                lastMessage: message
            })
        }
    }

    return (
        <>
            <div className="chat-container">
                <div className="chat-container-header">

                    <div className="chat-user-info">

                        <div className="chat-user-img">
                            <img src={chatUser?.photURL || "default-image-url"} alt=""></img>
                        </div>
                        <p>{chatUser?.fullname || "no name available"}</p>



                    </div>
                    <div className="chat-container-header-btn">
                        <MoreVertIcon />
                    </div>

                </div>
                <div className="chat-display-containe" ref={chatBox} >{/*chatMessagelai render Garxa*/}
                    {messageData.map((message) => (
                        <ChatMesssage key={message.id} message={message.text} time={message.timeStamp} sender={message.senderEmail} />
                    ))}

                    {/* <ChatMesssage message='hello how are you?' time="08/04/2023" />{/*props pass gareko abo yo props chatmessage ma use hunxa*/}
                    {/* <ChatMesssage message='hello how are you?' time="08/04/2023" />
                    <ChatMesssage message='hello how are you?' time="08/04/2023" /> */}
                </div>
                <div className="chat-input">
                    {/*button*/}
                    <div className="emoji-picker-react">
                        {openemojibox && <EmojiPicker onEmojiClick={(emojiObject, event) => setMessage(message + emojiObject.emoji)} />}{/*jaba opnemojibox chai true,  and emoji grap garera input vitra lagaunalai function use hunxaonemojiclick*/}

                    </div>
                    <div className="chat-input-btn">
                        <InsertEmoticonIcon onClick={() => setOpenemojibox(!openemojibox)} />{/*switch of emoji*/}
                        <AttachFileIcon />
                    </div>
                    <form onSubmit={send}>
                        <input type="text" placeholder='type text' value={message} onChange={(e) => {
                            console.log(e.target.value)
                            setMessage(e.target.value)
                        }} />{/*input ma text value type garda change hunuparxa so change garnalaionchange use hunxa*/}{/*type vayako dekhauxa console ma but inputma type vayako dekhaudaina so lekhnuko track dekhaunalai setMessageko use hynxa*/}
                    </form>
                    <div className="chat-input-bt" onClick={send}>
                        < SendIcon />
                    </div>
                </div>
            </div>

        </>
    )
}

export default ChatContainer
