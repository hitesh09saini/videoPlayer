import React, { useEffect, useState } from 'react';
import Context from './videoContextApi'
import axios from 'axios'
import url from '../url.js'
import Loading from '../components/Loading'

const ContextProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetch = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${url}/videos`, { withCredentials: true });
      setVideos(res.data.result);
      setLoading(false)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetch();
  }, [])

  return (
    <Context.Provider value={{ videos, setVideos, fetch }}>
      {
        loading&&(<Loading />)
      }
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
