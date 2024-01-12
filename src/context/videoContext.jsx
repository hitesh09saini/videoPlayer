import React, { useEffect, useState } from 'react';
import Context from './videoContextApi'
import axios from 'axios'
import url from '../url.js'

const ContextProvider = ({ children }) => {
  const [videos, setVideos] = useState([]);

  const fetch = async () => {
    try {
      const res = await axios.get(`${url}/videos`);
      setVideos(res.data.result);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetch();
  }, [])

  return (
    <Context.Provider value={{ videos, setVideos, fetch }}>
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
