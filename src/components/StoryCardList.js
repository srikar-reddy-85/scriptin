// import React, { useState, useEffect } from 'react';
// import supabase from '../config/superbaseClient';
// import './StoryCardList.css';
// import StoryDialog from './StoryDialog';

// const StoryCardList = () => {
//     const [stories, setStories] = useState([]);
//     const [showStoryDialog, setShowStoryDialog] = useState(false);
//     const [selectedStory, setSelectedStory] = useState(null);
//     const [authorData, setAuthorData] = useState(null);

//     const openStoryDialog = async (story) => {
//         try {
//             // Fetch additional data from the profiles table using the story id
//             const { data: authorData, error: authorError } = await supabase
//                 .from('profiles')
//                 .select('username, full_name, avatar_url, website, profession')
//                 .eq('id', story.id)
//                 .single();

//             if (authorError) {
//                 throw authorError;
//             }

//             // Set the fetched author data to the state
//             setAuthorData(authorData);
//             console.log(authorData);
//             setSelectedStory(story);
//             setShowStoryDialog(true);
//         } catch (error) {
//             console.error('Error fetching author data:', error.message);
//         }
//     };

//     const closeStoryDialog = () => {
//         setShowStoryDialog(false);
//         // Clear author data when the dialog is closed
//         setAuthorData(null);
//     };

//     useEffect(() => {
//         // Fetch data from Supabase when the component mounts
//         fetchData();
//     }, []);

//     const fetchData = async () => {
//         try {
//             // Fetch data from the specified table
//             const { data: stories, error } = await supabase.from('stories').select('id, img_url, title, description, plot');
//             if (error) {
//                 throw error;
//             }

//             // Set the fetched data to the state
//             setStories(stories);
//         } catch (error) {
//             console.error('Error fetching data:', error.message);
//         }
//     };

//     return (
//         <div className='cardcontainer'>
//             {stories.map((story, index) => (
//                 <div key={index} className="card" onClick={() => openStoryDialog(story)}>
//                     <header className="card__thumb">
//                         <img src={`https://cpxogxnuwzsgaoohrgli.supabase.co/storage/v1/object/public/storyimg/${story.img_url}`} alt={story.title} />
//                     </header>
//                     <div className="card__body">
//                         <h2 className="card__title">{story.title}</h2>
//                         <p className="card__description">{story.description}</p>
//                     </div>
//                 </div>
//             ))}
//             {showStoryDialog && (
//                 <StoryDialog
//                     imageUrl={`https://cpxogxnuwzsgaoohrgli.supabase.co/storage/v1/object/public/storyimg/${selectedStory.img_url}`}
//                     title={selectedStory.title}
//                     description={selectedStory.description}
//                     story={selectedStory.plot}
//                     authorData={authorData}
//                     onClose={closeStoryDialog}
//                 />
//             )}
//         </div>
//     );
// };

// export default StoryCardList;

// =========================================================================================================================
// --------------------------------------------------------------------------------------------------------------------------

import React, { useState, useEffect } from 'react';
import supabase from '../config/superbaseClient';
import './StoryCardList.css';
import StoryDialog from './StoryDialog';
import { BsArrowUpRightSquareFill, BsArrowDownRightSquareFill } from "react-icons/bs";
import { ScaleLoader } from 'react-spinners';
// import ClipLoader from "react-spinners/ClipLoader";


const StoryCardList = () => {
    const [stories, setStories] = useState([]);
    const [showStoryDialog, setShowStoryDialog] = useState(false);
    const [selectedStory, setSelectedStory] = useState(null);
    const [authorData, setAuthorData] = useState(null);
    const [loading, Setloading] = useState(true);
    // const [isUpVoted, setIsUpVoted] = useState(false);
    // const [isDownVoted, setIsDownVoted] = useState(false);
    // const [voteStates, setVoteStates] = useState({});


    const openStoryDialog = async (story) => {
        try {
            const { data: authorData, error: authorError } = await supabase
                .from('profiles')
                .select('username, full_name, avatar_url, website, profession')
                .eq('id', story.id)
                .single();

            if (authorError) {
                throw authorError;
            }

            setAuthorData(authorData);
            setSelectedStory(story);
            setShowStoryDialog(true);
        } catch (error) {
            console.error('Error fetching author data:', error.message);
        }
    };

    const closeStoryDialog = () => {
        setShowStoryDialog(false);
        setAuthorData(null);
    };

    const handleVote = async (type, storyId) => {
        try {
            const userId = (await supabase.auth.getUser()).data.user.id;

            const { data: story, error: fetchError } = await supabase
                .from('stories')
                .select('id, upvote, downvote, upvoted_users, downvoted_users')
                .eq('storyid', storyId)
            // .single();  // Use .single() instead of .map() to fetch a single record

            if (fetchError) {
                throw fetchError;
            }

            if (!story) {
                console.error('Story not found.');
                return;
            }

            const isUserUpvoted = story[0].upvoted_users.map((user) => user === userId).includes(true);
            // setIsUpVoted(isUserUpvoted);
            const isUserDownvoted = story[0].downvoted_users.map((user) => user === userId).includes(true);
            // setIsDownVoted(isUserDownvoted);
            // setVoteStates((prevStates) => ({
            //     ...prevStates,
            //     [storyId]: {
            //         isUpVoted: isUserUpvoted,
            //         isDownVoted: isUserDownvoted,
            //     },
            // }));

            if (type === 'upvote') {
                // If the user is downvoted, remove from downvoted_users and decrement downvote
                if (isUserUpvoted) {
                    // If the user is already upvoted, remove from upvoted_users and decrement upvote
                    await supabase
                        .from('stories')
                        .update({
                            upvote: story[0].upvote - 1,
                            upvoted_users: story[0].upvoted_users.filter((user) => user !== userId),
                        })
                        .eq('storyid', storyId);
                }
                if (isUserDownvoted) {
                    await supabase
                        .from('stories')
                        .update({
                            downvote: story[0].downvote - 1,
                            downvoted_users: story[0].downvoted_users.filter((user) => user !== userId),
                        })
                        .eq('storyid', storyId);
                }

                // If the user is not upvoted, add to upvoted_users and increment upvote
                if (!isUserUpvoted) {
                    await supabase
                        .from('stories')
                        .update({
                            upvote: story[0].upvote + 1,
                            upvoted_users: [...story[0].upvoted_users, userId],
                        })
                        .eq('storyid', storyId);
                }
            } else if (type === 'downvote') {
                // If the user is upvoted, remove from upvoted_users and decrement upvote
                if (isUserDownvoted) {
                    // If the user is already downvoted, remove from downvoted_users and decrement downvote
                    await supabase
                        .from('stories')
                        .update({
                            downvote: story[0].downvote - 1,
                            downvoted_users: story[0].downvoted_users.filter((user) => user !== userId),
                        })
                        .eq('storyid', storyId);
                }
                if (isUserUpvoted) {
                    await supabase
                        .from('stories')
                        .update({
                            upvote: story[0].upvote - 1,
                            upvoted_users: story[0].upvoted_users.filter((user) => user !== userId),
                        })
                        .eq('storyid', storyId);
                }

                // If the user is not downvoted, add to downvoted_users and increment downvote
                if (!isUserDownvoted) {
                    await supabase
                        .from('stories')
                        .update({
                            downvote: story[0].downvote + 1,
                            downvoted_users: [...story[0].downvoted_users, userId],
                        })
                        .eq('storyid', storyId);
                }
            }

            // Fetch updated data after voting
            fetchData();
            // setIsUpVoted(isUserUpvoted);
            // setIsDownVoted(isUserDownvoted);
        } catch (error) {
            console.error('Error updating vote:', error.message);
        }
    };


    useEffect(() => {
        // Setloading(true);
        fetchData();
        // setTimeout(() => {
        //     Setloading(false);
        // }, 5000);
    }, []);

    const fetchData = async () => {
        try {
            const { data: stories, error } = await supabase
                .from('stories')
                .select('id, storyid, img_url, title, description, plot, upvote, downvote, upvoted_users, audio_url');

            if (error) {
                throw error;
            }

            setStories(stories);
            Setloading(false);

        } catch (error) {
            console.error('Error fetching data:', error.message);
        }
    };

    return (

        <>
            {loading ?
                <ScaleLoader className='loader' color="#3ecf8e" loading={loading} size={200} />
                :
                <div className='cardcontainer'>
                    {stories.map((story, index) => (
                        <div key={index} className="card">
                            <header className="card__thumb">
                                <img src={`https://cpxogxnuwzsgaoohrgli.supabase.co/storage/v1/object/public/storyimg/${story.img_url}`} alt={story.title} />
                            </header>
                            <div className="card__body">
                                <h2 onClick={() => openStoryDialog(story)} className="card__title">{story.title}</h2>
                                <p className="card__description">{story.description}</p>
                                <audio controls src={`https://cpxogxnuwzsgaoohrgli.supabase.co/storage/v1/object/public/storyaudio/${story.audio_url}`}></audio>
                                <div className="card__votes">
                                    <button className="card__upbutton" onClick={() => handleVote('upvote', story.storyid)}><BsArrowUpRightSquareFill size={20} /> ({story.upvote})</button>
                                    <button className="card__downbutton" onClick={() => handleVote('downvote', story.storyid)}><BsArrowDownRightSquareFill size={20} /> ({story.downvote})</button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {showStoryDialog && (
                        <StoryDialog
                            imageUrl={`https://cpxogxnuwzsgaoohrgli.supabase.co/storage/v1/object/public/storyimg/${selectedStory.img_url}`}
                            title={selectedStory.title}
                            description={selectedStory.description}
                            story={selectedStory.plot}
                            authorData={authorData}
                            id={selectedStory.id}
                            onClose={closeStoryDialog}

                        />
                    )}
                </div>
            }
        </>
    );
};

export default StoryCardList;
