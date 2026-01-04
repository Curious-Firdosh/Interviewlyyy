import { ZapIcon } from 'lucide-react'
import React from 'react'
import Features from './features'

const HeroSection = () => {
  return (
    <>
        <div className='max-w-7xl mx-auto px-4 py-20 '>
            
            <div className='grid lg:grid-cols-2 gap-12 items-center'>

                {/* Left Content */}
                <div className='space-y-8'>

                    <div className=' badge badge-primary badge-lg p-3'>
                        <span>Realtime Colaboration</span>
                        <ZapIcon className='size-4'/>
                    </div>

                    {/* Headings */}
                    <h1 
                        className='text-5xl lg:text-7xl font-black leading-tight '
                    >
                        <span className='bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent'>Code Together</span>
                            <br></br>
                        <span>Learn Together</span>
                    </h1>
                  
                  {/* Info */}

                  <p className="text-xl text-base-content/70 leading-relaxed max-w-xl">
                    The ultimate platform for collaborative coding interviews and pair programming.
                    Connect face-to-face, code in real-time, and ace your technical interviews.
                 </p>

                  <Features/>

                </div>

                {/* Right Side */}
                
                <img
                    src='./hero.png'
                    alt='Colab Platform'
                    className='w-full h-auto rounded-3xl  shadow-2xl border-4 border-base-100 hover:scale-105 transition-transform duration-500' 
                />
        

            </div>
        </div>
    </>
  )
}

export default HeroSection
