import { SignInButton } from '@clerk/clerk-react'
import { ArrowRightIcon, CheckIcon, VideoIcon } from 'lucide-react'
import React from 'react'

const Features = () => {
  return (
    <>
    
        {/* FEATURE PILLS */}
            <div className="flex flex-wrap gap-3">
                    <div className="badge badge-lg badge-outline">
                        <CheckIcon className="size-4 text-success" />
                        Live Video Chat
                    </div>
                    <div className="badge badge-lg badge-outline">
                        <CheckIcon className="size-4 text-success" />
                        Code Editor
                    </div>
                    <div className="badge badge-lg badge-outline">
                        <CheckIcon className="size-4 text-success" />
                        Multi-Language
                    </div>
            </div>

        {/* CTA BUTTON */}

        <div className="mt-6 flex flex-wrap gap-4">
            <SignInButton mode="modal">
                <button className="btn btn-primary btn-lg">
                    Start Coding Now
                    <ArrowRightIcon className="size-5" />
                </button>
            </SignInButton>

            <button className='btn btn-outline btn-lg'>
                    <VideoIcon className='size-5'/>
                    Watch Demo
            </button>
            
        </div>

        {/* Stats */}

        <div className='stats stats-horizontal lg:stats-horizontal bg-base-100 shadow-accent '>
            <div className='stat px-3 '>
                <div className='stat-value text-primary '>5K+</div>
                <div className='stat-title ' >Active Users</div>
            </div> 

            <div className='stat px-3 '>
                <div className='stat-value text-secondary'>55K+</div>
                <div className='stat-title ' >Sessions</div>
            </div> 

            <div className='stat px-3 '>
                <div className='stat-value text-accent '>99.9 %</div>
                <div className='stat-title ' >Uptime</div>
            </div>  
        </div>

    </>
  )
}

export default Features
