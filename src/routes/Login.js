// // Login.js
// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import supabase from '../config/superbaseClient';
// import './Login.css'
// import { BsGoogle } from 'react-icons/bs';
// import { useSession } from '@supabase/auth-helpers-react';
// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     // const supabaseclient = useSupabaseClient();
//     const navigate = useNavigate();
//     const session = useSession();

//     const handleLoginWithGoogle = async () => {
//         const { user, error } = await supabase.auth.signInWithOAuth({
//             provider: "google",
//         })
//         // navigate('/')
//         if (error) {
//             console.log(error)
//         }
//         console.log(user);
//         console.log(session);
//         // if ((await supabase.auth.getSession()).data.session.user.role = "authenticated") {
//         //     navigate('/')
//         // }


//     }

//     const handleLogin = async () => {
//         const { user, error } = await supabase.auth.signInWithPassword({
//             email: email,
//             password: password,
//         });
//         // console.log(user);


//         const { data, erroruser } = await supabase
//             .from('profiles')
//             .select()
//             .eq('id', (await supabase.auth.getUser()).data.user.id)

//         if (error) {
//             console.log(error.message);
//         }
//         if (erroruser) {
//             console.error(erroruser.message);
//         }
//         else if (data[0].username != null) {
//             console.log('User logged in:', data);
//             navigate('/');
//         }
//         else {
//             console.log('User logged in:', user);
//             navigate('/profile'); // Redirect to the home page upon successful login
//         }
//     };

//     return (
//         <div className='logincard-container'>
//             <div className='login-card'>

//                 <h1>SCRIPTIN</h1>
//                 <h2>Login</h2>
//                 <div className='input-container'>
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} className='button-container'>
//                     <button style={{ fontFamily: "Lato", fontWeight: "bold" }} onClick={handleLogin}>Log In</button>
//                     <span>or</span>
//                     <button style={{ width: "fit-content" }} onClick={handleLoginWithGoogle}><BsGoogle size={20} /></button>
//                 </div>
//                 <p>
//                     Don't have an account? <Link style={{ textDecorationColor: "white" }} to="/signup"><span style={{ color: "white" }}>Sign Up</span></Link>
//                 </p>
//             </div>
//             <div className='login-image'>
//                 <img src="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2021/07/how-to-become-a-writer.png" alt="" />
//             </div>
//         </div>
//     );
// };

// export default Login;

// =====================================================================================================
// Login.js
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import supabase from '../config/superbaseClient';
// import './Login.css';
// import { BsGoogle } from 'react-icons/bs';
// import { useSession } from '@supabase/auth-helpers-react';

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();
//     const session = useSession();

//     const handleLoginWithGoogle = async () => {
//         try {
//             const { user, error } = await supabase.auth.signInWithOAuth({
//                 provider: 'google',
//             });

//             if (error) {
//                 console.error('Error during Google login:', error.message);
//                 return;
//             }

//             const { data, errorUser } = await supabase
//                 .from('profiles')
//                 .select()
//                 .eq('id', user.id);

//             if (errorUser) {
//                 console.error('Error fetching user profile:', errorUser.message);
//                 return;
//             }

//             if (data[0]?.username != null) {
//                 console.log('User logged in:', data);
//                 navigate('/');
//             } else {
//                 console.log('User logged in:', user);
//                 navigate('/profile');
//             }
//         } catch (error) {
//             console.error('Unexpected error during Google login:', error.message);
//         }
//     };

//     const checkAuthenticatedUser = async () => {
//         try {
//             const sessionData = (await supabase.auth.getSession()).data.session;

//             if (sessionData.user && sessionData.user.role === 'authenticated') {
//                 navigate('/');
//             }
//         } catch (error) {
//             console.error('Error checking authenticated user:', error.message);
//         }
//     };

//     const handleLogin = async () => {
//         try {
//             const { user, error } = await supabase.auth.signInWithPassword({
//                 email,
//                 password,
//             });

//             if (error) {
//                 console.error('Error during email/password login:', error.message);
//                 return;
//             }

//             await checkAuthenticatedUser();
//         } catch (error) {
//             console.error('Unexpected error during login:', error.message);
//         }
//     };

//     useEffect(() => {
//         // On component mount, check if the user is already authenticated
//         checkAuthenticatedUser();
//     }, []);

//     return (
//         <div className="logincard-container">
//             <div className='login-card'>
//                 <h1>SCRIPTIN</h1>
//                 <h2>Login</h2>
//                 <div className='input-container'>
//                     <input
//                         type="email"
//                         placeholder="Email"
//                         value={email}
//                         onChange={(e) => setEmail(e.target.value)}
//                     />
//                     <input
//                         type="password"
//                         placeholder="Password"
//                         value={password}
//                         onChange={(e) => setPassword(e.target.value)}
//                     />
//                 </div>
//                 <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} className='button-container'>
//                     <button style={{ fontFamily: "Lato", fontWeight: "bold" }} onClick={handleLogin}>Log In</button>
//                     <span>or</span>
//                     <button style={{ width: "fit-content" }} onClick={handleLoginWithGoogle}><BsGoogle size={20} /></button>
//                 </div>
//                 <p>
//                     Don't have an account? <Link style={{ textDecorationColor: "white" }} to="/signup"><span style={{ color: "white" }}>Sign Up</span></Link>
//                 </p>
//             </div>
//             <div className='login-image'>
//                 <img src="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2021/07/how-to-become-a-writer.png" alt="" />
//             </div>
//         </div>
//     );
// };

// export default Login;

// Login.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import supabase from '../config/superbaseClient';
import './Login.css';
import { BsGoogle } from 'react-icons/bs';
import { useSession } from '@supabase/auth-helpers-react';
import { IoEye, IoEyeOff } from "react-icons/io5";
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false); // Added state for showPassword
    const navigate = useNavigate();
    const session = useSession();

    const handleLoginWithGoogle = async () => {
        try {
            const { user, error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
            });

            if (error) {
                console.error('Error during Google login:', error.message);
                return;
            }

            const { data, errorUser } = await supabase
                .from('profiles')
                .select()
                .eq('id', user.id);

            if (errorUser) {
                console.error('Error fetching user profile:', errorUser.message);
                return;
            }

            if (data[0]?.username != null) {
                console.log('User logged in:', data);
                navigate('/');
            } else {
                console.log('User logged in:', user);
                navigate('/profile');
            }
        } catch (error) {
            console.error('Unexpected error during Google login:', error.message);
        }
    };

    const checkAuthenticatedUser = async () => {
        try {
            const sessionData = (await supabase.auth.getSession()).data.session;

            if (sessionData.user && sessionData.user.role === 'authenticated') {
                navigate('/');
            }
        } catch (error) {
            console.error('Error checking authenticated user:', error.message);
        }
    };

    const handleLogin = async () => {
        try {
            const { user, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error('Error during email/password login:', error.message);
                return;
            }

            await checkAuthenticatedUser();
        } catch (error) {
            console.error('Unexpected error during login:', error.message);
        }
    };

    // Toggle the visibility of the password
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        // On component mount, check if the user is already authenticated
        checkAuthenticatedUser();
    }, []);

    return (
        <div className="logincard-container">
            <div className='login-card'>
                <h1>SCRIPTIN</h1>
                <h2>Login</h2>
                <div className='input-container'>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type={showPassword ? "text" : "password"} // Show password based on state
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* Toggle show password */}
                    <span className="show-password" onClick={toggleShowPassword}>
                        {showPassword ? <IoEyeOff style={{ cursor: "pointer" }} size={25} /> : <IoEye style={{ cursor: "pointer" }} size={25} />}
                    </span>
                </div>
                <div style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }} className='button-container'>
                    <button style={{ fontFamily: "Lato", fontWeight: "bold", marginRight: "8px" }} onClick={handleLogin}>Log In</button>
                    <span>or</span>
                    <button style={{ width: "fit-content", marginLeft: "8px", padding: "4px", marginRight: "18px" }} onClick={handleLoginWithGoogle}><BsGoogle style={{ marginTop: "3px" }} size={20} /></button>
                </div>
                <p>
                    Don't have an account? <Link style={{ textDecorationColor: "white" }} to="/signup"><span style={{ color: "white" }}>Sign Up</span></Link>
                </p>
            </div>
            <div className='login-image'>
                <img style={{ height: "90.5%", objectFit: "cover" }} src="https://contenthub-static.grammarly.com/blog/wp-content/uploads/2021/07/how-to-become-a-writer.png" alt="" />
            </div>
        </div>
    );
};

export default Login;

