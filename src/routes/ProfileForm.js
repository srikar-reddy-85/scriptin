// import React, { useState } from 'react';
// import supabase from '../config/superbaseClient';
// import { useNavigate } from 'react-router-dom';
// import Avatar from '../components/Avatar';

// const ProfileForm = (props) => {
//     const [username, setUsername] = useState('');
//     const [fullName, setFullName] = useState('');
//     const [avatarUrl, setAvatarUrl] = useState('');
//     const [website, setWebsite] = useState('');
//     const [profession, setProfession] = useState('');
//     const navigate = useNavigate();

//     const handleInsert = async () => {
//         try {
//             const userPromise = supabase.auth.getUser();
//             const user = await userPromise; // Wait for the promise to resolve

//             if (!user) {
//                 console.error('User information not available. User might not be authenticated.');
//                 return;
//             }


//             const { data, error } = await supabase
//                 .from('profiles')
//                 .upsert([
//                     {
//                         updated_at: user.data.user.updated_at,
//                         id: user.data.user.id,
//                         username: username,
//                         full_name: fullName,
//                         avatar_url: avatarUrl,
//                         website: website,
//                         profession: profession,
//                     },
//                 ])
//                 .select();

//             navigate('/')

//             if (error) {
//                 console.error(error.message);
//                 return;
//             }

//             console.log('Data inserted:', data);
//             // Optionally, you can handle success and navigate to another page
//         } catch (error) {
//             console.error('Unexpected error during insert:', error.message);
//         }
//     };
//     return (
//         <div>
//             {props.email != null ?
//                 <>
//                     <h2>Profile Form</h2>
//                     <form>
//                         <Avatar
//                             url={avatarUrl}
//                             size={150}
//                             onUpload={(url) => {
//                                 setAvatarUrl(url)
//                             }}
//                         />
//                         <label>
//                             Username:
//                             <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//                         </label>
//                         <br />
//                         <label>
//                             Full Name:
//                             <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
//                         </label>
//                         <br />
//                         <label>
//                             Avatar URL:
//                             <input type="text" value={avatarUrl} onChange={(e) => setAvatarUrl(e.target.value)} />
//                         </label>
//                         <br />
//                         <label>
//                             Website:
//                             <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
//                         </label>
//                         <br />
//                         <label>
//                             Profession:
//                             <input type="text" value={profession} onChange={(e) => setProfession(e.target.value)} />
//                         </label>
//                         <br />
//                         <button type="button" onClick={handleInsert}>
//                             Insert Profile
//                         </button>
//                     </form>
//                 </>
//                 :
//                 navigate('/login')}
//         </div>
//     );
// };

// export default ProfileForm;


import React, { useState, useEffect } from 'react';
import supabase from '../config/superbaseClient';
import { useNavigate } from 'react-router-dom';
import Avatar from '../components/Avatar';
import Navbar from '../components/Navbar';
import './ProfileForm.css'
import { CiGlobe, CiUser } from 'react-icons/ci';
import { MdMailOutline, MdWorkOutline } from "react-icons/md";
import { MdOutlineEngineering } from 'react-icons/md';
import Inbox from '../components/Inbox';
import { ScaleLoader } from 'react-spinners';
import { FaUserTie, FaTheaterMasks, FaWrench, FaEdit } from 'react-icons/fa'; // Import the icons for Director, Actor, Crew, and Editor

// import Footer from '../components/Footer';

// import Header from '../components/Header';

const ProfileForm = (props) => {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [website, setWebsite] = useState('');
    const [profession, setProfession] = useState('');
    const [personalMail, setPersonalMail] = useState('');
    const [loading, setLoading] = useState(true);
    const [checkProfession, setCheckProfession] = useState(null);
    const navigate = useNavigate();
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


    const professionIcons = {
        Writer: <MdOutlineEngineering color='#F1FFAB' size={16} style={{ position: "relative", top: "1.6px", marginRight: "3px", marginLeft: "4px" }} />,
        Director: <FaUserTie color='#DC8686' size={16} style={{ position: "relative", top: "1.6px", marginRight: "3px", marginLeft: "4px" }} />,
        Actor: <FaTheaterMasks color='#FCF5ED' size={16} style={{ position: "relative", top: "1.6px", marginRight: "3px", marginLeft: "4px" }} />,
        Crew: <FaWrench color='#F5F7F8' size={16} style={{ position: "relative", top: "1.6px", marginRight: "3px", marginLeft: "4px" }} />,
        Editor: <FaEdit color='#7071E8' size={16} style={{ position: "relative", top: "1.6px", marginRight: "3px", marginLeft: "4px" }} />,
    };

    const icon = professionIcons[profession] || professionIcons['Writer'];

    useEffect(() => {
        // setLoading(true);
        const fetchUserProfile = async () => {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select()
                    .eq('id', (await supabase.auth.getUser()).data.user.id);

                // console.log(data[0].avatar_url)

                if (error) {
                    console.error(error.message);
                    return;
                }

                if (data.length > 0) {
                    const profileData = data[0];
                    setUsername(profileData.username || '');
                    setFullName(profileData.full_name || '');
                    setAvatarUrl(profileData.avatar_url || '');
                    // console.log(profileData.avatar_url)
                    setWebsite(profileData.website || '');
                    setProfession(profileData.profession || '');
                    setCheckProfession(profileData.profession);
                    setPersonalMail(profileData.personal_mail)
                }
                setLoading(false);


            } catch (error) {
                console.error('Unexpected error during data fetch:', error.message);
            }
        };

        fetchUserProfile();
        // setTimeout(() => {
        //     setLoading(false);
        // }, 5000);
    }, []); // Empty dependency array to run the effect only once on mount

    const handleInsert = async () => {
        try {
            const userPromise = supabase.auth.getUser();
            const user = await userPromise; // Wait for the promise to resolve

            if (!user) {
                console.error('User information not available. User might not be authenticated.');
                return;
            }

            const { data, error } = await supabase
                .from('profiles')
                .upsert([
                    {
                        updated_at: user.data.user.updated_at,
                        id: user.data.user.id,
                        username: username,
                        full_name: fullName,
                        avatar_url: avatarUrl,
                        website: website,
                        profession: profession,
                        personal_mail: personalMail,
                    },
                ])
                .select();

            navigate('/');

            if (error) {
                console.error(error.message);
                return;
            }

            console.log('Data inserted:', data);
            // Optionally, you can handle success and navigate to another page
        } catch (error) {
            console.error('Unexpected error during insert:', error.message);
        }
    };

    const professionOptions = ['Writer', 'Director', 'Editor', 'Actor', 'Crew'];

    return (
        <div className='pfbackground'>
            <Navbar />
            {props.email != null ? (
                <>
                    {loading ?
                        <ScaleLoader className='loader' color="#3ecf8e" loading={loading} size={200} />
                        :
                        <><div className='settings-container'>
                            <div className='profile-container'>
                                <div className='profileform'>

                                    <Avatar
                                        url={avatarUrl}
                                        size={150}
                                        onUpload={(url) => {
                                            setAvatarUrl(url);
                                        }} />



                                    <form className='form-grid'>
                                        <div className='label-input-container'>
                                            <label><span className='navicon'><CiUser size={18} /></span>Username:</label>
                                            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                                        </div>
                                        <div className='label-input-container'>
                                            <label>Full Name:</label>
                                            <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                                        </div>
                                        <div className='label-input-container'>
                                            <label><span className='navicon'><CiGlobe size={18} /></span>Website:</label>
                                            <input type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
                                        </div>
                                        {checkProfession !== null ?
                                            <div style={{ position: "relative", left: "10px" }}>
                                                <span style={{ border: "solid", borderRadius: "40px", padding: "3px", color: colors.border, marginBottom: "4px" }}>
                                                    {icon}
                                                    <span style={{ fontWeight: "lighter" }}>{profession}</span>
                                                </span>
                                            </div>

                                            :

                                            <div className='label-profession-container'>
                                                {/* <label><span className='navicon'><MdWorkOutline size={18} /></span>Profession:</label>
            <input type="text" value={profession} onChange={(e) => setProfession(e.target.value)} /> */}
                                                <label><span className='navicon'><MdWorkOutline size={18} /></span>Profession:</label>
                                                <select className='profession' value={profession} onChange={(e) => setProfession(e.target.value)}>
                                                    <option value="">Select Profession</option>
                                                    {professionOptions.map(option => (
                                                        <option key={option} value={option}>{option}</option>
                                                    ))}
                                                </select>
                                            </div>}

                                        <div className='label-input-container'>
                                            <label><span className='navicon'><MdMailOutline size={18} /></span>Personal mail:</label>
                                            <input type="text" value={personalMail} onChange={(e) => setPersonalMail(e.target.value)} />
                                        </div>
                                    </form>
                                    <button style={{ position: "relative", top: "-160px", left: "10px", fontFamily: "Poppins" }} type="button" onClick={handleInsert}>
                                        Update
                                    </button>
                                </div>
                            </div>
                            <div className='inbox'>
                                <Inbox />
                            </div>
                        </div>
                            {/* <Footer /> */}
                        </>
                    }
                </>
            ) : (
                navigate('/login')
            )}
        </div>
    );
};

export default ProfileForm;
