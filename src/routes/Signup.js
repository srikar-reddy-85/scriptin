// // Signup.js
// import React, { useState } from 'react';
// import supabase from '../config/superbaseClient';
// import { Link } from 'react-router-dom';
// // import { BsGoogle } from 'react-icons/bs';

// const Signup = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     // const navigate = useNavigate();

//     // const handleLoginWithGoogle = async () => {
//     //     const { user, error } = await supabase.auth.signInWithOAuth({
//     //         provider: "google",
//     //         options: { redirectTo: "http://localhost:3000/login" }
//     //     })
//     //     console.log(user);

//     // }

//     const handleSignup = async () => {
//         const { user, error } = await supabase.auth.signUp({
//             email,
//             password,
//         });

//         if (error) {
//             console.error(error.message);
//         } else {
//             console.log('User signed up:', user);
//         }
//     };

//     return (
//         <div style={{ flexDirection: "row-reverse" }} className='logincard-container'>

//             <div className='login-card'>
//                 <h1>SCRIPTIN</h1>
//                 <h2>Signup</h2>
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
//                 <button style={{ fontFamily: "Lato", fontWeight: "bold" }} onClick={handleSignup}>Sign Up</button>
//                 {/* <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }} className='button-container'>
//                     <button style={{ fontFamily: "Lato", fontWeight: "bold" }} onClick={handleSignup}>Sign Up</button>
//                     <span>or</span>
//                     <button style={{ width: "fit-content" }} onClick={handleLoginWithGoogle}><BsGoogle size={20} /></button>
//                 </div> */}
//                 <p>
//                     already have an account?  <Link style={{ textDecorationColor: "white" }} to="/login"><span style={{ color: "white" }}>login</span></Link>
//                 </p>
//             </div>
//             <div className='login-image'>
//                 <img style={{ height: "65.8%", objectFit: "cover" }} src="https://miro.medium.com/v2/resize:fit:1400/1*HAYx2YSlhcKgAeXwX3i5Rw.jpeg" alt="" />
//             </div>
//         </div>
//     );
// };

// export default Signup;


// Signup.js
import React, { useState } from 'react';
import supabase from '../config/superbaseClient';
import { Link } from 'react-router-dom';
import { IoEye, IoEyeOff } from "react-icons/io5";


const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isEmailSent, setIsEmailSent] = useState(false);

    const handleSignup = async () => {
        try {
            const { user, error } = await supabase.auth.signUp({
                email,
                password,
            });

            if (error) {
                console.error('Error during signup:', error.message);
                return;
            }

            // Clear form fields
            setEmail('');
            setPassword('');

            // Set state to show email sent message
            setIsEmailSent(true);
        } catch (error) {
            console.error('Unexpected error during signup:', error.message);
        }
    };

    // Toggle the visibility of the password
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div style={{ flexDirection: "row-reverse" }} className='logincard-container'>
            <div className='login-card'>
                <h1>SCRIPTIN</h1>
                <h2>Signup</h2>
                <div className='input-container'>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {/* Toggle show password */}
                    <span className="show-password" onClick={toggleShowPassword}>
                        {showPassword ? <IoEyeOff style={{ cursor: "pointer" }} size={25} /> : <IoEye style={{ cursor: "pointer" }} size={25} />}
                    </span>
                </div>
                <button style={{ fontFamily: "Lato", fontWeight: "bold" }} onClick={handleSignup}>Sign Up</button>
                {isEmailSent && (
                    <p style={{ color: 'green' }}>Verification email has been sent. Please check your email.</p>
                )}
                <p>
                    Already have an account?{' '}
                    <Link style={{ textDecorationColor: 'white' }} to="/login">
                        <span style={{ color: 'white' }}>Login</span>
                    </Link>
                </p>
            </div>
            <div className='login-image'>
                <img
                    style={{ height: '71.4%', objectFit: 'cover' }}
                    src="https://miro.medium.com/v2/resize:fit:1400/1*HAYx2YSlhcKgAeXwX3i5Rw.jpeg"
                    alt=""
                />
            </div>
        </div>
    );
};

export default Signup;


