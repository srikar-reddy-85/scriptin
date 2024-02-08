// import React from 'react';
// import './StoryDialog.css'; // Create a CSS file for styling
// import { IoCloseSharp } from "react-icons/io5";
// import AuthorCard from './AuthorCard';
// // import { FaCross, FaXbox } from 'react-icons/fa';

// const StoryDialog = ({ imageUrl, title, description, story, authorData, id, onClose }) => {
//     // console.log(id);
//     return (
//         <div className="story-dialog">
//             <div className="dialog-content">
//                 <AuthorCard authorData={authorData} />
//                 <img src={imageUrl} alt={title} />
//                 <h2 style={{ color: "white" }}>{title}</h2>
//                 <p>{description}</p>
//                 <p>{story}</p>
//                 <button className='button1' onClick={onClose}><IoCloseSharp size={23} /></button>
//             </div>
//         </div>

//     );
// };

// export default StoryDialog;


import React, { useState } from 'react';
import './StoryDialog.css';
import { IoCloseSharp } from 'react-icons/io5';
import AuthorCard from './AuthorCard';
import ContactDialog from './ContactDialog'; // Import the new ContactDialog component

const StoryDialog = ({ imageUrl, title, description, story, authorData, id, onClose }) => {
    const [showContactDialog, setShowContactDialog] = useState(false);

    const openContactDialog = () => {
        setShowContactDialog(true);
    };

    const closeContactDialog = () => {
        setShowContactDialog(false);
    };

    return (
        <div className="story-dialog">
            <div className="dialog-content">
                <AuthorCard authorData={authorData} />
                <img src={imageUrl} alt={title} />
                <h2 style={{ color: 'white' }}>{title}</h2>
                <p>{description}</p>
                <p>{story}</p>
                <button style={{ backgroundColor: "teal", fontFamily: "Comfortaa" }} className='button' onClick={openContactDialog}>
                    Contact
                </button>
                <button className='button1' onClick={onClose}>
                    <IoCloseSharp size={23} />
                </button>
            </div>

            {showContactDialog && (
                <ContactDialog
                    onClose={closeContactDialog}
                    id={id}
                    story_title={title}
                />
            )}
        </div>
    );
};

export default StoryDialog;
