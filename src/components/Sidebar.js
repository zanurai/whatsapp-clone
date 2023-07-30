import React, { useEffect, useState } from 'react'
import TollIcon from '@mui/icons-material/Toll';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import Userprofile from './Userprofile';
import db from '../firebase'
const Sidebar = ({ currentUser, signOut }) => {//app.js bata aako props
    const [allUser, setAllUser] = useState([])//empty array is because all user are store in there from the firebase database
    //useEffect is use for preform background ofaction likefetching data work on the apis
    const [searchInput, setSearchInput] = useState('');//for search searchInputle chai search ma entered gare value store garxa
    const [friendList, setFriendList] = useState([]) //friendlist variable le chai current user ko friend lai store garxa  firebase database bata
    useEffect(() => {//useEffect has a callback function
        const getAllUser = async () => {//sabai userlai graps garxa
            const data = await db.collection('users').onSnapshot(snapshot => {//onsnapshot firebase firestore api le provide gareko method ho firestore database ma update vayako realtimelai yesle listen garxa
                console.log(snapshot.docs)
                setAllUser(snapshot.docs.filter((doc) => doc.data().email !== currentUser?.email))//eleminate  the depth perticular doc whose email is equal to current user
            })//create or take a small shotall the datainside this collection nameuser
        }

        //grap the friends
        const getFriends = async () => {
            const data = await db.collection('friendlist').doc(currentUser.email).collection('list')
                .onSnapshot((snapshot) => {
                    console.log(snapshot.docs)
                    setFriendList(snapshot.docs)
                })
        }
        getAllUser()
        getFriends()
    }, [])//dependency if the dependency is empty array it initializely re-render the component
    console.log('user >>>', allUser)
    //for filter function
    const searchedUser = allUser.filter((users) => {//jaba input text appare the user filter or searchUser tespaxi searchUser convert into userprofile component and then it appare in the screen
        //if searchInput chai true xa vane tyaha searInput chai filtering ko lagi use hunxa// yadi toLowerCase().includes yesko means capitalletter ma includes xa vane smallletter ma convert garne
        if (searchInput && users.data().name?.toLowerCase().includes(searchInput.toLowerCase())) {
            console.log(users.data().name);//&& oprater le two part join gareko xa
            return users;
        }
    });
    const searchItem = searchedUser.map((users) => {//searchUser array chai maping garera Userprofile array ma transform hunx
        return (//jaba yo srachUser maping vaisakxa ra euta new Userprofile create hunxa as a part ma new searchItem return garxa
            <Userprofile
                name={users.data().fullname}
                photURL={users.data().photURL}
                key={users.id}
                email={users.data().email}
            />// tespaxi searchUser convert into userprofile component 
        )
    })
    return (
        <>
            <div className="sidebar">
                <div className="sidebar-header" >

                    <img src={currentUser?.photURL} alt="" onClick={signOut}></img>

                    <div className="sidebar-button">
                        <TollIcon />
                        <InsertCommentIcon />
                        <MoreVertIcon />
                    </div>
                </div>
                <div className="searchbar">
                    <div className="barsearch">
                        <div className='search-icon'>
                            <SearchIcon />
                        </div>
                        <input type="text" name='search' placeholder='Search..' value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
                    </div>
                </div>
                <div className="sidebar-chat-list">
                    {searchItem.length > 0 ? searchItem : friendList.map((friend) => (//curly bracess ma rakhda js evalute garxa//friendList.map((friend) =>arrow function le chai pratek friendlist array vitra ko praket objlai userprofile components ma transform garxa
                        <Userprofile name={friend.data().fullname}
                            photURL={friend.data().photURL}
                            lastMessage={friend.data().lastMessage}
                            email={friend.data().email}
                        />
                    ))}
                    {/* {searchItem.length > 0 ? (
                        searchItem
                    ) : (
                        <Userprofile name="John Doe" photoURL="./user.png" />// then it appare in the screen// yesma photo dekhaunalai google ma arko acc add garnu parxa
                            
                    )} */}
                    {/*<Userprofile name="Zanu Rai" photoURL="./user.png" />{/*sidebar will be the parent of userprofile and this is passing the props to their child userprofile and userprofile is using*/}
                    {/*<Userprofile name="Niru Rai" photoURL="./user.png" />
                    <Userprofile name="Gyanu Rai" photoURL="./user.png" />
                    <Userprofile name="Akasky Rai" photoURL="./user.png" />
                    <Userprofile />
                    <Userprofile />
                    <Userprofile />
                    <Userprofile />
                    <Userprofile />
                    <Userprofile />
                    <Userprofile />
                    <Userprofile />
                    <Userprofile />
                    <Userprofile />
                    <Userprofile />
                    <Userprofile />
                    <Userprofile />
                    <Userprofile />
                    <Userprofile />
                    <Userprofile />
    <Userprofile />*/}

                </div>
            </div>

        </>
    )
}

export default Sidebar
