// import React, { useEffect, useState } from 'react';
// import supabase from '../config/superbaseClient';
// import Navbar from '../components/Navbar';
// import { useNavigate } from 'react-router-dom';
// import StoryForm from '../components/StoryForm';
// import UserStoryCardList from '../components/UserStoryCardList';
// import './Stories.css'



// const Stories = (props) => {
//     const [username, setUsername] = useState('');
//     const [profession,setProfession] = useState();
//     const navigate = useNavigate();
//     const handleRedirectToProfile = () => {
//         navigate('/profile');
//     };
//     useEffect(() => {
//         const fetchUserProfile = async () => {
//             try {
//                 const { data, error } = await supabase
//                     .from('profiles')
//                     .select()
//                     .eq('id', (await supabase.auth.getUser()).data.user.id);
//                 // console.log(data);
//                 setUsername(data[0].username)
//                 setProfession(data[0].profession)
//                 if (error) {
//                     console.error(error.message);
//                     return;
//                 }
//             } catch (error) {
//                 console.error('Unexpected error during data fetch:', error.message);
//             }
//         };

//         fetchUserProfile();
//     }, []);
//     return (
//         <div>
//             {props.email != null ? (
//                 <>
//                     {username != null ? (
//                         <>
//                             {/* <Header /> */}
//                             <Navbar />
//                             <div className='storiescontainer'>
//                                 <StoryForm />
//                                 <UserStoryCardList />
//                             </div>
//                         </>
//                     ) : (
//                         <>
//                             <div className="dialog-box">
//                                 <p>Please fill the form to view.</p>
//                                 <button onClick={handleRedirectToProfile}>Settings</button>
//                             </div>

//                         </>
//                     )}
//                 </>
//             ) : (
//                 navigate('/login')
//             )}
//         </div>
//     )
// }

// export default Stories


import React, { useEffect, useState } from 'react';
import supabase from '../config/superbaseClient';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import StoryForm from '../components/StoryForm';
import UserStoryCardList from '../components/UserStoryCardList';
import './Stories.css';

const Stories = (props) => {
    const [username, setUsername] = useState('');
    const [profession, setProfession] = useState('Writer');
    const navigate = useNavigate();

    const handleRedirectToProfile = () => {
        navigate('/profile');
    };

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select()
                    .eq('id', (await supabase.auth.getUser()).data.user.id);

                if (data && data.length > 0) {
                    setUsername(data[0].username);
                    setProfession(data[0].profession);
                }

                if (error) {
                    console.error(error.message);
                }
            } catch (error) {
                console.error('Unexpected error during data fetch:', error.message);
            }
        };

        fetchUserProfile();
    }, []);

    return (
        <div>
            {props.email != null ? (
                <>
                    {username != null ? (
                        <>
                            {profession === 'Writer' ? (
                                <>
                                    <Navbar />
                                    <div className='storiescontainer'>
                                        <StoryForm />
                                        <UserStoryCardList />
                                    </div>
                                </>
                            ) : (
                                <><div className='dialog-box'>
                                    <p>Sorry, only writers can access this page.</p>
                                    <button onClick={() => navigate('/')}>Go to Home</button>
                                </div>

                                </>
                            )}
                        </>
                    ) : (
                        <><div className='dialog-box'>
                            <p>Please fill the form to view.</p>
                            <button onClick={handleRedirectToProfile}>Go to Settings</button>
                        </div>
                        </>
                    )}
                </>
            ) : (
                navigate('/login')
            )}
        </div>
    );
};

export default Stories;


