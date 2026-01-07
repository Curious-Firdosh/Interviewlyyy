import React, { useState } from 'react'
import Navbar from '../Components/Navbar'
import { useActiveSessions, useCreateSession, useMyRecentSessions } from '../Hooks/useSessions'
import {  useNavigate } from 'react-router'
import { useUser } from '@clerk/clerk-react'
import WelcomeSection from '../Components/Dashboard/WelcomeSection'
import StatsCards from '../Components/Dashboard/StatsCards'
import ActiveSession from '../Components/Dashboard/ActiveSession'
import RecentSession from '../Components/Dashboard/RecentSession'
import CreateSessionModal from '../Components/Dashboard/CreateSessionModal'
import toast from 'react-hot-toast'

const Dashboard = () => {

  const Navigate = useNavigate();

  const {user} = useUser();

  const [showCreateModal ,setCreateModal ] = useState(false);
  const[roomConfig , setRoomconfig] = useState({problem : "" , difficulty : ""});

  const createSessionMutaion = useCreateSession();
  const {data :activeSessionsData ,isLoading : loadingActiveSession} = useActiveSessions();
  const {data :recentSessionsData ,isLoading : loadingRecentSession} = useMyRecentSessions();

  const activeSession = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.recentSessions || [];

  const handleCreateRoom = () => {

    if(!roomConfig.problem || !roomConfig.difficulty) {
        toast.error("Please select a problem to create session");
        return;
    };

    createSessionMutaion.mutate({
        problem : roomConfig.problem ,
        difficulty : roomConfig.difficulty
      },
      { 
          onSuccess : (data) => {
              setCreateModal(false);
              Navigate(`/session/${data?.session?._id}`)
              console.log(data);
          
        }
      }

    )


  }


  const isUserInSession = (session) => {
    if(!user.id) return false;

    return session?.host?.clerkId === user.id || session?.participant?.clerkId === user.id;
  }

  

  return (
    <div>
      
      <div className='min-h-full bg-base-300'>
          <Navbar/>
          <WelcomeSection onCreateSession = {() => setCreateModal(true)}/>
          
          {/* Grid LayOut */}
          <div className='container bg-base-300'>

                <div className='grid grid-cols-1 lg:grid-cols-3 gap-6  '>
                    
                    <StatsCards
                      activeSessionsCount={activeSession.length}
                      recentSessionsCount={recentSessions.length}
                    
                    />
                    <ActiveSession
                      sessions = {activeSession}
                      isLoading = {loadingActiveSession}
                      isUserInSession = {isUserInSession}
                    />
                </div>

                <RecentSession
                    sessions = {recentSessions}
                    isLoading = {loadingRecentSession}
                />
          </div>

          <CreateSessionModal 
              isOpen = {showCreateModal}
              onClose = {() => setCreateModal(false)}
              roomConfig = {roomConfig}
              setRoomconfig = {setRoomconfig}
              onCreateRoom = {handleCreateRoom}
              isCreating = {createSessionMutaion.isPending}
          />
      </div>
    
    </div>
  )
}

export default Dashboard
