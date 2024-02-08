// AuthorCard.js

import React from 'react';
import './AuthorCard.css'

const AuthorCard = ({ authorData }) => {
    return (
        <>
            {/* <h2 style={{ color: "rgb(31, 150, 255)" }}>Author:</h2> */}
            <img style={{ width: "100px", height: "100px", borderRadius: "50%", objectFit: "cover" }} src={`https://cpxogxnuwzsgaoohrgli.supabase.co/storage/v1/object/public/avatars/${authorData.avatar_url}`} alt={authorData.username} />
            <div className="author-card">
                <h3>{authorData.fullName}</h3>
                <p>Username: {authorData.username}</p>
                <p>Profession: {authorData.profession}</p>
                <p>Website: {authorData.website}</p>
            </div>
            <div style={{ width: "80%", color: "rgb(31, 150, 255)", borderRadius: "4px", border: "solid", position: "relative", left: "10%", marginBottom: "20px" }}></div>
        </>
    );
};

export default AuthorCard;
