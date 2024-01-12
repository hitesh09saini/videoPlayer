
import ReactPlayer from 'react-player';
import { Link } from 'react-router-dom'
const Video = ({ item }) => {
  const subtitle_id = item.timestamps;
  return (
    <div className={`rounded bg-white p-4 shadow w-fit m-2`}>
      <h1 className='text-2xl'>{item.filename || "Name"}</h1>
      <div className='my-4'>
        <ReactPlayer
          width="400px"
          height="300px"
          url={item.secure_url || 'http://localhost:5000/'}
        />

      </div>

      <Link to={`/seevideos/${item._id}/${subtitle_id}`}>
        <div className='bg-blue-600 p-2 m-1 text-white rounded hover:bg-blue-500 w-[100px] text-center'>
          Visit 
        </div>
      </Link>

    </div>
  );
};

export default Video;
