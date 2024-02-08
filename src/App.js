
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './routes/Signup';
import Login from './routes/Login';
import Home from './routes/Home';
import supabase from './config/superbaseClient';
import ProfileForm from './routes/ProfileForm';
import Stories from './routes/Stories';
import Trending from './routes/Trending';
// import { useSession } from '@supabase/auth-helpers-react';

const App = () => {
  const [user, setUser] = useState(supabase.auth.getSession());
  // console.log(user)
  // const session = useSession();
  // console.log(session);
  useEffect(() => {
    const { data, error, unsubscribe } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (error) {
        // console.log(error);
      }
      else if (data) {
        // console.log(data.subscription.id);
      }
    });
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);


  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        {user ? (
          <><Route path="/" element={<Home {...user} />} />
            <Route path="/profile" element={<ProfileForm {...user} />} />
            <Route path='/stories' element={<Stories {...user} />} />
            <Route path='/trending' element={<Trending {...user} />} />
          </>

        ) : (
          <Route path="/*" element={<Navigate to="/login" />} />

        )}
      </Routes>
    </Router >
  );
};

export default App;




