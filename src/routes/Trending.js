import Navbar from '../components/Navbar'
import TrendingStoryList from '../components/TrendingStoryList'
import './Trending.css'
import supabase from '../config/superbaseClient'
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Trending = (props) => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    // const session = useSession();
    // if (!session) {
    //     navigate('/login')
    // }

    const handleRedirectToProfile = () => {
        navigate('/profile');
    };
    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const { data, error } = await supabase
                    .from('profiles')
                    .select()
                    .eq('id', ((await supabase.auth.getUser()).data.user.id));
                // console.log(data);
                setUsername(data[0].username)
                if (error) {
                    console.error(error.message);
                    return;
                }
            } catch (error) {
                console.error('Unexpected error during data fetch:', error.message);
            }
        };

        fetchUserProfile();
    }, [props]);
    return (
        <div>
            {props.email != null ? (
                <>
                    {username != null ? (
                        <>
                            {/* <Header /> */}
                            <Navbar />
                            <TrendingStoryList />

                        </>
                    ) : (
                        <>
                            <div className="dialog-box">
                                <p>Please fill the form to view.</p>
                                <button onClick={handleRedirectToProfile}>Settings</button>
                            </div>

                        </>
                    )}
                </>
            ) : (
                navigate('/login')
            )}
        </div>
    )
}

export default Trending
