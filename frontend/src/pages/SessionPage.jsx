import React from 'react'
import Navbar from '../Components/Navbar'
import ProblemDescription from '../Components/Problems/ProblemDescription'
import { useNavigate, useParams } from 'react-router'
import { useUser } from '@clerk/clerk-react'

const SessionPage = () => {

    const Navigate = useNavigate()
    const {id} = useParams();
    const {user} = useUser();

    

  return (
    <div>
        <Navbar/>

        <ProblemDescription/>
    </div>
  )
}

export default SessionPage
