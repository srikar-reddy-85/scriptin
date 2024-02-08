// import React from 'react';
// import './InboxMessage.css'; // Import your CSS file for styling
// import { FaRegArrowAltCircleRight } from "react-icons/fa";
// // import { GrUserManager } from "react-icons/gr";
// import { MdOutlineEngineering } from "react-icons/md";
// import ReplyContact from './ReplyContact';

// const InboxMessage = ({ profilePic, username, message, story_title, profession, personal_mail, receiver_id }) => {


//     return (
//         <div className="inbox-post">
//             <div className="profile-pic">
//                 <img src={profilePic} alt="Profile Pic" />
//             </div>
//             {profession === 'Writer' ?

//                 <div className="post-content">
//                     <div className="username">@{username} <span style={{ border: "solid", borderRadius: "40px", padding: "3px", color: '#1d9bf0', marginBottom: "4px" }}><MdOutlineEngineering color='#E0F4FF' size={16} style={{ position: "relative", top: "1.6px", marginRight: "3px", marginLeft: "4px" }} /><span style={{ fontWeight: "lighter" }}>{profession}</span></span> <span><FaRegArrowAltCircleRight size={16} style={{ marginLeft: "5px", color: "#A3F3EB" }} /></span> <span style={{ marginLeft: "6px" }}>{story_title}</span></div>
//                     <div className="message">{message}</div>
//                     <div><p style={{ color: "#6F61C0" }}>- {personal_mail}</p>
//                         {/* {showContactReplyDialog && ( */}
//                         <ReplyContact
//                             // onClose={closeContactReplyDialog}
//                             id={receiver_id}
//                             story_title={story_title}
//                         />
//                         {/* )} */}

//                     </div>
//                 </div>


//                 :

//                 <div className="post-content">
//                     <div className="username">@{username} <span style={{ border: "solid", borderRadius: "40px", padding: "3px", color: '#FB9A40', marginBottom: "4px" }}><MdOutlineEngineering color='#F1FFAB' size={16} style={{ position: "relative", top: "1.6px", marginRight: "3px", marginLeft: "4px" }} /><span style={{ fontWeight: "lighter" }}>{profession}</span></span> <span><FaRegArrowAltCircleRight size={16} style={{ marginLeft: "5px", color: "#A3F3EB" }} /></span> <span style={{ marginLeft: "6px" }}>{story_title}</span></div>
//                     <div className="message">{message}</div>
//                     <div><p style={{ color: "#6F61C0" }}>- {personal_mail}</p>
//                         {/* {showContactReplyDialog && ( */}
//                         <ReplyContact
//                             // onClose={closeContactReplyDialog}
//                             id={receiver_id}
//                             story_title={story_title}
//                         />
//                         {/* )} */}

//                     </div>
//                 </div>

//             }

//         </div>
//     );
// };

// export default InboxMessage;


import React from 'react';
import './InboxMessage.css'; // Import your CSS file for styling
import { FaRegArrowAltCircleRight } from 'react-icons/fa';
import { MdOutlineEngineering } from 'react-icons/md';
import { FaUserTie, FaTheaterMasks, FaWrench, FaEdit } from 'react-icons/fa'; // Import the icons for Director, Actor, Crew, and Editor
import ReplyContact from './ReplyContact';

const InboxMessage = ({ profilePic, username, message, story_title, profession, personal_mail, receiver_id }) => {
    // Define colors based on profession
    const professionColors = {
        Writer: {
            border: '#1d9bf0',
            iconColor: '#E0F4FF',
            arrowColor: '#A3F3EB',
        },
        Director: {
            border: '#7ED7C1',
            iconColor: '#F0DBAF',
            arrowColor: '#A3F3EB',
        },
        Actor: {
            border: '#FF7F50',
            iconColor: '#F5DEB3',
            arrowColor: '#A3F3EB',
        },
        Crew: {
            border: '#7071E8',
            iconColor: '#D8BFD8',
            arrowColor: '#A3F3EB',
        },
        Editor: {
            border: '#87CEEB',
            iconColor: '#ADD8E6',
            arrowColor: '#A3F3EB',
        },
    };

    const colors = professionColors[profession] || professionColors['Writer']; // Default to Writer colors if profession is not recognized

    // Choose the appropriate icon based on the profession
    const professionIcons = {
        Writer: <MdOutlineEngineering color='#F1FFAB' size={16} style={{ position: "relative", top: "1.6px", marginRight: "3px", marginLeft: "4px" }} />,
        Director: <FaUserTie color='#DC8686' size={16} style={{ position: "relative", top: "1.6px", marginRight: "3px", marginLeft: "4px" }} />,
        Actor: <FaTheaterMasks color='#FCF5ED' size={16} style={{ position: "relative", top: "1.6px", marginRight: "3px", marginLeft: "4px" }} />,
        Crew: <FaWrench color='#F5F7F8' size={16} style={{ position: "relative", top: "1.6px", marginRight: "3px", marginLeft: "4px" }} />,
        Editor: <FaEdit color='#7071E8' size={16} style={{ position: "relative", top: "1.6px", marginRight: "3px", marginLeft: "4px" }} />,
    };

    const icon = professionIcons[profession] || professionIcons['Writer']; // Default to Writer icon if profession is not recognized

    return (
        <div className="inbox-post">
            <div className="profile-pic">
                <img src={profilePic} alt="Profile Pic" />
            </div>
            <div className="post-content">
                <div className="username">
                    @{username}{' '}
                    <span style={{ border: "solid", borderRadius: "40px", padding: "3px", color: colors.border, marginBottom: "4px" }}>
                        {icon}
                        <span style={{ fontWeight: "lighter" }}>{profession}</span>
                    </span>{' '}
                    <span><FaRegArrowAltCircleRight size={16} style={{ marginLeft: "5px", color: colors.arrowColor }} /></span> <span style={{ marginLeft: "6px" }}>{story_title}</span>
                </div>
                <div className="message">{message}</div>
                <div>
                    <p style={{ color: "#6F61C0" }}>- {personal_mail}</p>
                    <ReplyContact id={receiver_id} story_title={story_title} />
                </div>
            </div>
        </div>
    );
};

export default InboxMessage;
