import { ChevronRight, ChevronRightIcon, Code2Icon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'
import { getDifficultyBadgeClass } from '../../lib/utils'




const Questions = ({problem}) => {
  return (
    <Link 
        to={`/problems/${problem.id}`}
        className='card bg-base-100 hover:scale-[1.01] transition-transform duration-150 '
    >
            <div className='card-body'>
                
                <div className='flex justify-between items-center gap-4'>

                     {/* Left Side */}
                    <div className='flex-1 '>
                        
                        <div className='flex items-center gap-3 mb-2 '>
                                
                                {/* Icon  */}
                                <div className='bg-primary/10 size-12 rounded-lg flex items-center justify-center'>
                                    <Code2Icon className='text-primary size-6'/>
                                </div>
                                
                                {/* Text on left of icon */}
                                <div>
                                    <div className='flex items-center gap-2 mb-1'>
                                        <h2>{problem.title}</h2>
                                        <span 
                                            className={`badge ${getDifficultyBadgeClass(problem.difficulty)} `}
                                        >
                                            {problem.difficulty}
                                        </span>
                                </div>

                                    <p className='text-base-content/30'>
                                        {problem.category}
                                    </p>
                            </div>
                            
                        </div>

                            <p className='text-base-content/80'>
                                {problem.description.text}
                            </p>
                    </div>
                    
                    {/* Right Side */}
                     <div className='flex items-center gap-2 text-primary'>
                        
                        <span>Solve</span>
                        <ChevronRightIcon  className='size-5'/>
                     </div>
                                         
                </div>
            </div>
     </Link>
  )
}

export default Questions
