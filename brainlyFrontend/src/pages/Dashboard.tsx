import { useEffect, useState } from 'react';
import '../index.css';
import { Button } from '../components/Buttons';
import { Card } from '../components/Card';
import { CreateContentModal } from '../components/CreateContentModal';
import { PlusIcon } from '../icons/PlusIcon';
import { ShareIcon } from '../icons/ShareIcon';
import { Sidebar } from '../components/sidebar';
import { useContent } from '../hooks/UseContent';
import axios from 'axios';
import { BACKEND_URL } from '../config';

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);

  const {contents, Refresh}   = useContent();

  useEffect(() => {
    Refresh();
  }, [modalOpen])

  return <div>
    <Sidebar />
    <div className='p-4 ml-72 min-h-screen bg-gray-100 border-l-2'>
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(false);
      }} />
      <div className='flex justify-end gap-4'>

        <Button onClick={() => {
          setModalOpen(true);
        }} variant='primary' text='Add Content' startIcon={<PlusIcon />} />
        <Button variant='secondary' text='Share Brain' startIcon={<ShareIcon />} onClick={async()=>{
          const response = await axios.post(`${BACKEND_URL}/api/v1/brain/share`, {
            share: true
          },{
            headers:{
              Authorization : localStorage.getItem("token")
            }
          });
          const shareUrl =  `https://localhost:5173/share/${response.data.hash}`;
          alert(shareUrl);
        }}></Button>
      </div>

      <div className='flex gap-4 flex-wrap'>
        {contents.map(({ type, title, link }) => 
          <Card
            type={type}
            title={title}
            link={link} />
        )}
      </div>
    </div>
  </div>
}