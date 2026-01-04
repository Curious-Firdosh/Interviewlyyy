import React from 'react'
import { getDifficultyBadgeClass } from '../../lib/utils'

const ProblemDescription = ({ problem , onProblemChange , currentProblemid , allProblems }) => {
  return (
    <div className='h-full overflow-y-auto'>
        
        
        {/* HeaderSection */}
        <div className='p-6 bg-base-100 border-b border-base-300'>

            {/* Staring */}
            <div className='flex justify-between items-start mb-3'>
                <h1 className='text-3xl font-bold'>{problem.title}</h1>
                <span className={`badge ${getDifficultyBadgeClass(problem.difficulty)}`}>{problem.difficulty}</span>
            </div>

            <div className='flex flex-col gap-3'>
                <span className='text-base-content/80'>{problem.category}</span>

                <div className='mt-4'>
                    <select 
                        className='select select-sm w-full'
                        value={currentProblemid}
                        onChange={(e) => {onProblemChange(e.target.value)}}
                    >
                        {
                            allProblems.map((p) => {
                                return <option 
                                          key={p.id}
                                          value={p.id}
                                         >
                                    {p.title} - {p.difficulty}
                                </option>
                            })
                        }

                    </select>
                </div>
            </div>

        </div>

        {/* DeSXRIPTION sECTION */}
        <div className='p-6 space-y-6  '>

            <div className='border-b border-base-300 p-5 rounded-xl shadow-sm  '>
                <h2 className='text-xl font-bold text-base-content'>Description</h2>

                <div className='text-base space-y-3 leading-relaxed'>
                    <p className='text-base'>{problem.description.text}</p>
                    
                    {
                        problem.description.notes.map((n, idx) => {
                            return <p key={idx}>{n}</p>
                        })
                    }

                </div>
            </div>

        </div>


        
        {/* EXAMPLES SECTION */}
        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold mb-4 text-base-content">Examples</h2>
          <div className="space-y-4">
            {problem.examples.map((example, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="badge badge-sm">{idx + 1}</span>
                  <p className="font-semibold text-base-content">Example {idx + 1}</p>
                </div>
                <div className="bg-base-200 rounded-lg p-4 font-mono text-sm space-y-1.5">
                  <div className="flex gap-2">
                    <span className="text-primary font-bold min-w-[70px]">Input:</span>
                    <span>{example.input}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-secondary font-bold min-w-[70px]">Output:</span>
                    <span>{example.output}</span>
                  </div>
                  {example.explanation && (
                    <div className="pt-2 border-t border-base-300 mt-2">
                      <span className="text-base-content/60 font-sans text-xs">
                        <span className="font-semibold">Explanation:</span> {example.explanation}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONSTRAINTS */}
        <div className="bg-base-100 rounded-xl shadow-sm p-5 border border-base-300">
          <h2 className="text-xl font-bold mb-4 text-base-content">Constraints</h2>
          <ul className="space-y-2 text-base-content/90">
            {problem.constraints.map((constraint, idx) => (
              <li key={idx} className="flex gap-2">
                <span className="text-primary">•</span>
                <code className="text-sm">{constraint}</code>
              </li>
            ))}
          </ul>
        </div>

    </div>
  )
}

export default ProblemDescription
