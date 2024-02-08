// import React from 'react'
// // import InboxMessage from './InboxMessage'
// import { useEffect } from 'react'
// import supabase from '../config/superbaseClient'

// const Inbox = async () => {

//     const receiverId = (await supabase.auth.getUser()).data.user.id;

//     useEffect(() => {

//         const { data: messages, error } = supabase
//             .from('contact')
//             .select()
//             .eq('receiver_id', receiverId)

//         console.log(messages);

//         if (error) {
//             console.log(error)
//         }

//     }, [])


//     return (
//         <div>

//         </div>
//     )
// }

// export default Inbox


import React, { useEffect, useState } from 'react';
import supabase from '../config/superbaseClient';
import InboxMessage from './InboxMessage';
import './Inbox.css'

const Inbox = () => {
    const [messages, setMessages] = useState([]);
    const [receiverId, setReceiverId] = useState(null);

    useEffect(() => {
        const fetchMessages = async () => {
            try {

                const currentReceiverId = (await supabase.auth.getUser()).data.user.id;
                setReceiverId(currentReceiverId);

                if (currentReceiverId) {
                    const { data, error } = await supabase
                        .from('contact')
                        .select(`
                        sender_id,
                        message,
                        story_title,
                        profiles(id,avatar_url,username,profession,personal_mail)
                        `)
                        .eq('receiver_id', currentReceiverId)
                    // console.log(data);
                    // console.log((await supabase.auth.getUser(data[0].sender_id)).data.user.email)
                    if (error) {
                        console.error('Error fetching messages:', error.message);
                    } else {
                        setMessages(data || []);
                    }
                }
            } catch (error) {
                console.error('Error fetching user:', error.message);
            }
        };

        fetchMessages();
    }, [receiverId]); // Include receiverId in the dependency array

    // return (
    //     <div className='inbox-container'>
    //         {/* Render your messages here */}
    //         {messages.map((message) => (
    //             <InboxMessage receiver_id={message.sender_id} profilePic={`https://cpxogxnuwzsgaoohrgli.supabase.co/storage/v1/object/public/avatars/${message['profiles'].avatar_url}`} username={message['profiles'].username} message={message.message} story_title={message.story_title} profession={message['profiles'].profession} personal_mail={message['profiles'].personal_mail} />
    //         ))}
    //     </div>
    // );
    // Assuming you're inside a functional component
    return (
        <div className='inbox-container'>
            {/* Render your messages here */}
            {messages.map((message) => {
                // Check if avatar_url starts with "https"
                const isExternalAvatar = message['profiles'].avatar_url.startsWith('https');

                // Construct the profilePic prop based on the condition
                const profilePic = isExternalAvatar
                    ? message['profiles'].avatar_url // If avatar_url starts with "https"
                    : `https://cpxogxnuwzsgaoohrgli.supabase.co/storage/v1/object/public/avatars/${message['profiles'].avatar_url}`;

                return (
                    <InboxMessage
                        key={message.id} // Add a unique key prop if "id" is available in your message object
                        receiver_id={message.sender_id}
                        profilePic={profilePic}
                        username={message['profiles'].username}
                        message={message.message}
                        story_title={message.story_title}
                        profession={message['profiles'].profession}
                        personal_mail={message['profiles'].personal_mail}
                    />
                );
            })}
        </div>
    );

};

export default Inbox;
