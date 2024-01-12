import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import url from '../url.js';
import axios from 'axios';

const SeeVideo = () => {
  const [data, setData] = useState(null);
  const [subtitles, setSubtitles] = useState([]);
  const [currentSubtitle, setCurrentSubtitle] = useState('');
  const [currentTime, setCurrentTime] = useState('');
  const { id, subtitle_id } = useParams();
  const [videoSubtitle, setVideoSubtitle] = useState({});
  const [seeSubtitle, setSeeSubtitle] = useState('');

  const fetchSubtitle = async () => {
    try {
      const res = await axios.get(`${url}/subtitles/${subtitle_id}`);
      console.log('Subtitle data:', res.data.subtitles.timestamps);
      setVideoSubtitle(
        res.data.subtitles.timestamps.reduce((acc, obj) => {
          acc[obj.time] = obj.text;
          return acc;
        }, {})
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchData = async () => {
    try {
      const res = await axios.get(`${url}/videos/${id}`);
      console.log('Video data:', res.data.result);
      setData(res.data.result);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubtitle = async () => {
    try {
      const res = await axios.put(`${url}/subtitles/${subtitle_id}`, {
        timestamps: [...subtitles],
      });
      setSubtitles([]);
      await fetchSubtitle();
    } catch (error) {
      console.error('Error updating subtitles:', error);
    }
  };

  useEffect(() => {
    const fetchDataAndSubtitle = async () => {
      await fetchData();
      await fetchSubtitle();
    };
    fetchDataAndSubtitle();
  }, [id]);

  const handleAddSubtitle = useCallback(() => {
    if (currentSubtitle.trim() !== '') {
      setSubtitles([...subtitles, { time: currentTime, text: currentSubtitle }]);
      setCurrentSubtitle('');
    }
  }, [currentSubtitle, currentTime, subtitles]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const handleProgress = ({ playedSeconds }) => {
    setCurrentTime(formatTime(playedSeconds));
    setSeeSubtitle(videoSubtitle[formatTime(playedSeconds)]);
  };

  return (
    <div className="px-4">
      {data ? (
        <div>
          <p className="text-3xl font-bold">{data.filename}</p>
          <div className="p-2 flex relative justify-center ">
            <ReactPlayer
              config={{
                file: {
                  attributes: {
                    controlsList: "nofullscreen",
                  },
                },
              }}
              controls={true}
              url={data.secure_url}
              onProgress={handleProgress}
            />
            {seeSubtitle && (
              <h1 className='p-1 absolute mb-[40px] self-end bg-[#07070781] text-white'>
                {seeSubtitle}
              </h1>
            )}
          </div>

          <div className="max-md:flex justify-between m-1">
            <input
              readOnly
              type="text"
              placeholder="00:00:00"
              className="border cursor-pointer border-2 pl-2 text-xl outline-none"
              value={currentTime}
            />
            <input
              type="text"
              placeholder="Sub-title"
              value={currentSubtitle}
              onChange={(e) => setCurrentSubtitle(e.target.value)}
              className="border border-2 pl-2 text-xl outline-none"
            />
            <button
              onClick={handleAddSubtitle}
              className="bg-blue-600 p-2 text-white rounded hover:bg-blue-500 active:text-red-600"
            >
              Add Subtitle
            </button>
          </div>

          <div className="min-h-[150px] pb-[50px] bg-black relative text-green-600 p-2">
            {subtitles.map((subtitle, index) => (
              <div key={index}>
                <p>$-- {subtitle.time + ': ' + subtitle.text}</p>
              </div>
            ))}

            <button
              onClick={handleSubtitle}
              className="bg-green-600 absolute bottom-2 left-2 p-2 hover:bg-green-500 rounded active:text-red-600 text-white"
            >
              Add
            </button>
          </div>
        </div>
      ) : (
        <p>No video found with ID: {id}</p>
      )}
    </div>
  );
};

export default SeeVideo;
