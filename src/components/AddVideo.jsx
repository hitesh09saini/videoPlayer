import React, { useContext} from 'react';
import { useState } from 'react';
import url from '../url.js'
import axios from 'axios'
import Context from '../context/videoContextApi.js'

const AddVideo = () => {
  const {fetch} = useContext(Context)
  const [video, setVideoFile] = useState(null);
  const [videoName, setVideoName] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setVideoFile(file);
  };

  const handleNameChange = (event) => {
    const name = event.target.value;
    setVideoName(name);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append('filename', videoName);
      formData.append('video', video);

      console.log('Video File:', video);
      console.log('Video Name:', videoName);

      const res = await axios.post(`${url}/videos`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      fetch();
      console.log(res);
      setVideoFile(null);
      setVideoName('');
    } catch (error) {
      alert('error');
      console.log('new video add error: ' + error);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto select-none mt-8 p-6 bg-white rounded-lg shadow-md">
      <h1 className='text-4xl font-bold mb-4'>Add New Video</h1>
      <div className="mb-4">
        <label htmlFor="videoFile" className="block text-gray-700 text-sm font-bold mb-2">
          Choose Video File:
        </label>
        <input
          type="file"
          id="videoFile"
          name='videoFile'
          onChange={handleFileChange}
          required
          className="w-full p-2 border rounded-md"
        />

      </div>

      <div className="mb-4">
        <label htmlFor="videoName" className="block text-gray-700 text-sm font-bold mb-2">
          Video Name:
        </label>
        <input
          type="text"
          id="videoName"
          value={videoName}
          onChange={handleNameChange}
          required
          className="w-full p-2 border rounded-md"
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
      >
        Submit
      </button>
    </form>
  );
};

export default AddVideo;
