import React, { useContext } from 'react'
import Video from './Video.jsx'
import Context from '../context/videoContextApi.js'
import { Link } from 'react-router-dom';

const Layout = () => {
    const { videos, setVideos } = useContext(Context)
    return (
        <div>
            <h1 className='p-2 border border-2 text-2xl text-center'>
                Video App
                <Link to='/AddVideo'>
                    <div className='bg-blue-600 m-1 active:text-red-400 hover:bg-blue-500 text-white font-bold'>Add+ </div>
                </Link>
            </h1>

            <div className='flex flex-wrap'>
                {
                    videos.map((item) => {
                        console.log(item);
                        return <Video key={item._id} item={item} />;
                    })}
            </div>

        </div>
    )
}

export default Layout
