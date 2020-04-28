import React, { useState, useEffect, useReducer }from 'react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import AppRouter from './routes/AppRouter';
import Header from './header/Header';
import UserContext from './context/userContext';
import userReducer from './reducers/user';
import LoadingCard from './components/loadingCard/LoadingCard';

function App() {
  const [user, dispatch] = useReducer(userReducer, {});
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    async function fetchUser() {
      let user = undefined;
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URI}/users/me`, {withCredentials: true});
        user = data.user;
      } catch (error) {
        console.log(error);
      }
      if (user) {
        dispatch({
          type: 'USER_LOGIN',
          user,
        });
      }
      setLoaded(true)
    }
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      <main>
        <BrowserRouter>
          <Header/>
          {loaded ? <AppRouter/> : <LoadingCard/>}
        </BrowserRouter>
      </main>
    </UserContext.Provider>
  );
}

export default App;
