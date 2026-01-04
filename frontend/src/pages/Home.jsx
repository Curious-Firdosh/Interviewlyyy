import { Sparkles, ArrowRightIcon} from 'lucide-react';

import {Link} from  "react-router"
import {SignInButton} from  "@clerk/clerk-react"
import HeroSection from '../Components/Home/HeroSection';
import Features from '../Components/Home/features';
import Features2 from '../Components/Home/Features2';

const Home = () => {
  return (
    <div className='bg-gradient-to-br  from-base-100  via-base-100 to-base-300'>

          {/* NavBar  */}
          <nav className='bg-base-100/80 backdrop-blur-md border-b border-primary/20 sticky top-0'>
                <div className='max-w-7xl mx-auto  p-4  flex items-center justify-between '>

                    {/* Logo */}
                    <Link   
                      to={"/"}
                      className='flex items-center gap-3 hover:scale-105 transition-transform duration-200'
                    >
                        <div className='size-10 rounded-xl bg-gradient-to-b from-primary via-secondary to-accent flex items-center justify-center'>
                            <Sparkles/>
                        </div>

                        <div className='flex flex-col'>
                            <h1 className='font-black text-xl bg-gradient-to-b from-primary via-secondary to-accent 
                              bg-clip-text text-transparent font-mono tracking-wider'>
                                InterviewlYYY
                            </h1>

                            <span className='text-xs text-base-content/60  font-medium mt-1'> Code Together</span>
                        </div>
                    </Link>

                    {/* Signup Button */}

                      <SignInButton mode = "modal">
                            <button   
                              className='group px-6 py-3 bg-gradient-to-r from-primary to-secondary rounded-xl 
                               text-white font-semibold text-sm shadow-lg hover:shadow-xl  transition-all duration-200 hover:scale-105
                               flex items-center justify-center gap-2 cursor-pointer 
                               '>
                                 
                                    <span className='text-white text-xs '>Get Started</span>
                                     <ArrowRightIcon  className='size-4 group-hover:translate-x-0.5 
                                     transition-transform'/>
                            </button>
                      </SignInButton>
                </div>
          </nav>

          <HeroSection/>

          <Features2/>


         
    </div>
  )
}

export default Home
