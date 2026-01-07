
import { useUser } from '@clerk/clerk-react'
import { Navigate, Route, Routes } from 'react-router'
import Home from './pages/Home'
import { Toaster } from 'react-hot-toast'
import Dashboard from './pages/Dashboard'
import ProblemsPage from './pages/ProblemsPage'
import ProblemDetails from './pages/ProblemDetails'
import SessionPage from './pages/SessionPage'


function App() {
  
  const {isSignedIn , isLoaded} = useUser()

  if(!isLoaded) return null;

  return (
    <>
    
        <Routes>

              <Route path='/' element= {!isSignedIn ? <Home/> : <Navigate to={'/dashboard'} />}/>
              <Route path='/problems' element= {isSignedIn ? <ProblemsPage/> : <Navigate to={'/'} />}/>
              <Route path='/dashboard' element= {isSignedIn ? <Dashboard/> : <Navigate to={'/'} />}/>
              <Route path='/problems/:id' element= {isSignedIn ? <ProblemDetails/> : <Navigate to={'/'} />}/>
              <Route path='/sessions/:id' element= {isSignedIn ? <SessionPage/> : <Navigate to={'/'} />}/>
              {/* <Route path='/' element= {<Home/>}/>
              <Route path='/problems' element= {<ProblemsPage/>}/>
              <Route path='/dashboard' element= {<Dashboard/>}/> */}

        </Routes>

        <Toaster/>
    </>
  )
}

export default App
