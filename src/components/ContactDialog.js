import React, { useState } from 'react';
import supabase from '../config/superbaseClient';
import './ContactDialog.css'
// import './ReplyContact.css'
import { CiLocationArrow1 } from "react-icons/ci";
import { RxCross2 } from "react-icons/rx";

const ContactDialog = ({ onClose, id, story_title }) => {
    const [message, setMessage] = useState('');
    const [existingMessage, setExistingMessage] = useState(false);

    const handleSend = async () => {
        try {
            // Replace 'receiverUserId' with the actual receiver user ID
            const receiverUserId = id; // Replace with the actual logic to determine the receiver user ID
            const title = story_title;
            const senderUserId = (await supabase.auth.getUser()).data.user.id;

            const { data: existingMessage, error: existingMessageError } = await supabase
                .from('contact')
                .select('id')
                .eq('sender_id', senderUserId)
                .eq('receiver_id', id)
                .eq('story_title', story_title)
                .single();

            if (existingMessage) {
                console.error('User has already sent a message for this story.');
                setExistingMessage(true);
                // You can show a message to the user or handle it in a way that fits your application
                return;
            }
            else {
                console.log(existingMessageError);
            }

            // Upload data to the 'contact' table in Supabase
            const { data, error } = await supabase.from('contact').upsert([
                {
                    sender_id: senderUserId,
                    receiver_id: receiverUserId,
                    message: message,
                    story_title: title,
                },
            ]);

            console.log(data);

            if (error) {
                throw error;
            }

            // Close the dialog after sending the message
            onClose();
        } catch (error) {
            console.error('Error sending message:', error.message);
        }
    };

    return (
        <div className="contact-dialog">
            <h2 style={{ color: "teal", marginBottom: 0 }}>Contact</h2>
            <h4 style={{ color: "#7ED7C1" }}>NOTE: YOU CAN ONLY SEND MESSAGE ONCE</h4>
            <textarea style={{ marginBottom: "10px" }}
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />
            {existingMessage ? (<>
                <h2 style={{ color: "red" }}>you already sent message</h2>
            </>) : (<></>)}
            <button style={{ marginBottom: "10px", paddingBottom: "7px" }} onClick={handleSend}><CiLocationArrow1 size={20} /></button>
            <button style={{ marginBottom: "10px", paddingBottom: "7px", color: "red" }} onClick={onClose}><RxCross2 size={20} /></button>
        </div>
    );
};

export default ContactDialog;
