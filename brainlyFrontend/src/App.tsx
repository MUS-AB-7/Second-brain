import { useState } from 'react';
import './App.css'
import { Button } from './components/Buttons';
import { Card } from './components/Card';
import { CreateContentModal } from './components/CreateContentModal';
import { PlusIcon } from './icons/PlusIcon';
import { ShareIcon } from './icons/ShareIcon';

function App() {

  const [modalOpen, setModalOpen] = useState(false);
  return <div className='p-4'>  
    <CreateContentModal open={modalOpen} onClose={()=>{
      setModalOpen(false);
    }} />
    <div className='flex justify-end gap-4'>

      <Button onClick={()=>{
        setModalOpen(true);
      }} variant='primary' text='Add Content' startIcon={<PlusIcon />} />
      <Button variant='secondary' text='Share Brain' startIcon={<ShareIcon />} />
    </div>

      <div className='flex gap-4'>
        <Card title='First tweet' type="twitter" link='https://x.com/kirat_tw/status/1633685473821425666' />
        <Card title='First Video' type="youtube" link='https://www.youtube.com/watch?v=tmeOjFno6Do' />
      {/* <Button startIcon={<PlusIcon />} endIcon={<ShareIcon  />} size='sm' variant='primary' text='Share' />  
      <Button startIcon={<PlusIcon  />} endIcon={<ShareIcon  />} size='md' variant='primary' text='Share' />
      <Button startIcon={<PlusIcon  />} endIcon={<ShareIcon  />} size='md' variant='primary' text='Share' /> */}
    </div>
  </div>
}

export default App
