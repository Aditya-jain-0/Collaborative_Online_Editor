import { React, useState } from 'react'
import { v4 } from 'uuid'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const Home = () => {

  const [roomId, setroomId] = useState('')
  const [username, setusername] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('');
  const navigate = useNavigate()

  const setoption = (option) => (setSelected(option), setIsOpen(false));

  const createnewroom = (e) => {
    e.preventDefault();
    const id = v4();
    setroomId(id)
    toast.success('new room created')
  }

  const joinroom = () => {
    if (!roomId || !username || !selected) {
      toast.error('Empty Fields ☹️')
      return
    }
    navigate(`/editor/${roomId}`, {
      state: {
        username,
        selected
      }
    })
  }

  return (
    <div className='homePageWrapper'>
      <div className='formWrapper'>
        <h1>Collaborative Online Editor</h1>
        <div className='inputGrp'>
          Username - <input
            type='text'
            className='inputBox'
            placeholder='Enter Username'
            value={username}
            onChange={(e) => setusername(e.target.value)}
          />

          Room ID - <input
            type='text'
            value={roomId}
            onChange={(e) => setroomId(e.target.value)}
            className='inputBox'
            placeholder='Enter Room ID'
          />

          <div className='optionarea'>
            <button className = 'optionbtn' onClick={() => setIsOpen(!isOpen)}>
              {selected ? (selected) : ('Check editor options')}
            </button>

            {isOpen && (
              <div className='options'>
                <p onClick={() => setoption('Python')}> Python</p>
                <p onClick={() => setoption('HTML,CSS,JS')}> HTML,CSS,JS</p>
              </div>
            )}
          </div>

          <button className='btn' onClick={joinroom}>Join</button>
          <span className='createInfo'>Generate <button className='btn ' onClick={createnewroom}>New Room ID</button></span>
        </div>
      </div>
    </div>
  )
}

export default Home