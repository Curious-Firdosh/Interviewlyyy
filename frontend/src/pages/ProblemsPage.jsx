import React from 'react'
import Navbar from '../Components/Navbar'
import { PROBLEMS } from '../data/problems'
import { Link } from 'react-router'
import Questions from '../Components/Problems/Questions'

const ProblemsPage = () => {
  
 const problems = Object.values(PROBLEMS);

 const easyProblemCount = problems.filter((p) => p.difficulty === "Easy").length;
 const mediumCount = problems.filter((problem) => problem.difficulty === "Medium").length;
  const HardCount = problems.filter((problem) => problem.difficulty === "Hard").length

  return (
    <div className='min-h-screen bg-base-200'>
        <Navbar/>

        <div className='max-w-6xl mx-auto px-4 py-12'>

            {/* Header */}
            <div className='mt-8 '>
                <h1 className='text-4xl font-bold mb-2'>
                  Practice Problems
                </h1>

                <p className='text-base-content/70 '>
                  Sharpen Your Coding Skills With These Curated
                  Problems
                </p>
                
            </div>

            {/* Problems List  */}
            <div className='space-y-4'>
                {
                  problems.map((problem ) => {
                      return  <Questions problem = {problem} key={problem.id}/>
                  })
                }
            </div>

            {/* Stats Footer */}
            <div className='card mt-12 bg-base-100'>
                
                <div className='card-body'>

                    <div className='stats stats-vertical lg:stats-horizontal'>
                        
                        <div className='stat'>    
                          <span className='stat-title'>Totle Problems</span>
                          <h2 className='stat-value text-primary'>{problems.length}</h2>
                        </div>

                        <div className='stat'>
                            <span className='stat-title'>Easy</span>
                          <h2 className='stat-value text-primary'>{easyProblemCount}</h2>
                        </div>

                        <div className='stat'>
                          <span className='stat-title'>Medium</span>
                          <h2 className='stat-value text-warning'>{mediumCount}</h2>
                        </div>

                        <div className='stat'>
                          <span className='stat-title'>Hard</span>
                          <h2 className='stat-value text-error'>{HardCount}</h2>
                        </div>
                    </div>
                </div>

                
            </div>

        </div>

    </div>
  )
}

export default ProblemsPage
