// import React, { useState, useEffect } from 'react';
// import supabase from '../config/superbaseClient';
// import './UserStoryCardList.css'
// const UserStoryCardList = () => {
//     const [stories, setStories] = useState([]);



//     useEffect(() => {
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             const { data: stories, error } = await supabase
//                 .from('stories')
//                 .select('id, storyid, img_url, title, description, plot, upvote, downvote, upvoted_users')
//                 .eq('id', (await supabase.auth.getUser()).data.user.id);

//             if (error) {
//                 throw error;
//             }

//             setStories(stories);
//         } catch (error) {
//             console.error('Error fetching data:', error.message);
//         }
//     };

//     return (
//         <div className='user_cardcontainer'>
//             {stories.map((story, index) => (
//                 <div key={index} className="user_card">
//                     <header className="user_card__thumb">
//                         <img src={`https://cpxogxnuwzsgaoohrgli.supabase.co/storage/v1/object/public/storyimg/${story.img_url}`} alt={story.title} />
//                     </header>
//                     <div className="usesr_card__body">
//                         <h2 className="user_card__title">{story.title}</h2>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     );
// };

// export default UserStoryCardList;

import React, { useState, useEffect } from 'react';
import supabase from '../config/superbaseClient';
import './UserStoryCardList.css';
import UpdateForm from '../components/UpdateForm'; // Import your custom UpdateForm component
import { ScaleLoader } from 'react-spinners';


const UserStoryCardList = () => {
    const [stories, setStories] = useState([]);
    const [showUpdateForm, setShowUpdateForm] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // setLoading(true);
        // setTimeout(() => {
        //     setLoading(false);
        // }, 5000);
        fetchData();

    }, []);

    const fetchData = async () => {
        // console.log("fetching data")
        try {
            const { data: stories, error } = await supabase
                .from('stories')
                .select('id, storyid, message, img_url, title, description, plot, upvote, downvote, upvoted_users')
                .eq('id', (await supabase.auth.getUser()).data.user.id);

            if (error) {
                throw error;
            }
            // console.log(stories)

            setStories(stories);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    const openUpdateForm = (story) => {
        // console.log(story);
        setSelectedStory(story);
        setShowUpdateForm(true);
    };

    const handleDelete = async (storyId) => {
        try {
            await supabase
                .from('stories')
                .delete()
                .eq('storyid', storyId);

            // Fetch updated data after deletion
            fetchData();
        } catch (error) {
            console.error('Error deleting story:', error.message);
        }
    };

    return (
        <>
            {loading ?
                <ScaleLoader className='loader' color="#3ecf8e" loading={loading} size={200} />
                :

                <div className='user_cardcontainer'>
                    {stories.map((story, index) => (
                        <div key={index} className="user_card">
                            <header className="user_card__thumb">
                                <img src={`https://cpxogxnuwzsgaoohrgli.supabase.co/storage/v1/object/public/storyimg/${story.img_url}`} alt={story.title} />
                            </header>
                            <div className="usesr_card__body">
                                <h2 className="user_card__title">{story.title}</h2>
                                {/* Add update button */}
                                <button className='update_button' onClick={() => openUpdateForm(story)}>Update</button>
                                <button className='delete_button' onClick={() => handleDelete(story.storyid)}>Delete</button>
                            </div>
                        </div>
                    ))}

                    {showUpdateForm && (
                        <UpdateForm
                            story={selectedStory}
                            onCancel={() => setShowUpdateForm(false)}
                            onUpdate={() => {
                                // Call fetchData or any other necessary function after update
                                fetchData();
                                setShowUpdateForm(false);
                            }}
                        />
                    )}
                </div>
            }
        </>
    );
};

export default UserStoryCardList;
