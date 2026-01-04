import React from 'react'
import { PROBLEMS } from '../../data/problems'
import { Code2Icon, LoaderIcon, PlusIcon } from 'lucide-react'


const CreateSessionModal = ({isOpen, onClose, roomConfig, setRoomconfig, onCreateRoom, isCreating}) => {


    const problems = Object.values(PROBLEMS);
    

    if(!isOpen) return null

  return (
    <div className='modal modal-open'>

        <div className='modal-box mx-w-2xl '>
            <h2 className='font-bold text-2xl mb-6'>Create New Session</h2>

            <div  className='space-y-8'>
                
                {/* problem Selection */}
                <div className='space-y-4'>
                    <label className='label'>
                        <span className='label-text font-bold'>Select Problem</span>
                        <span className='label-text-alt text-error'> * </span>
                    </label>

                    <select 
                        className='select w-full'
                        value={roomConfig.problem}
                        onChange={ (e) => {
                            const selectedProblem = problems.find((p) => p.id === e.target.value);
                            setRoomconfig ({
                                difficulty : selectedProblem?.difficulty,
                                problem : e.target.value
                            })
                        }}
                    >
                        <option
                            disabled
                            value= ''
                        >
                            Choose the Coding Problem
                        </option>

                        {
                           problems.map((p) => {
                                return <option key= {p.id} value={p.id} >
                                    {p.title} - ({p.difficulty})
                                  </option>
                            })
                        }
                    </select>
                </div>


                  {/* ROOM SUMMARY */}
                {roomConfig.problem && (
                    <div className="alert alert-success">
                    <Code2Icon className="size-5" />
                    <div>
                        <p className="font-semibold">Room Summary:</p>
                        <p>
                        Problem: <span className="font-medium">{roomConfig.problem}</span>
                        </p>
                        <p>
                        Max Participants: <span className="font-medium">2 (1-on-1 session)</span>
                        </p>
                    </div>
                    </div>
                )}
                

                <div className="modal-action">
                    <button className="btn btn-ghost" onClick={onClose}>
                        Cancel
                    </button>

                        <button
                            className="btn btn-primary gap-2"
                            onClick={onCreateRoom}
                            disabled={isCreating || !roomConfig.problem}
                        >
                            {isCreating ? (
                            <LoaderIcon className="size-5 animate-spin" />
                            ) : (
                            <PlusIcon className="size-5" />
                            )}

                            {isCreating ? "Creating..." : "Create"}
                        </button>
                </div>
            </div>
            <div className="modal-backdrop" onClick={onClose}></div>
        </div>
       
        
    </div>
  )
}

export default CreateSessionModal
