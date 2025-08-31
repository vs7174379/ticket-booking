import { ArrowRight, Calendar1Icon, ClockIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HeroSection = () => {
    const navigate = useNavigate();
    return (
        <div className='relative h-screen w-full overflow-hidden '>
            {/* Background with gradient overlay */}
            <div className='absolute inset-0'>
                <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10' />
                <img
                    src='/backgroundImage.jpg'
                    alt='Background'
                    className='w-full h-full object-cover hidden md:block'
                />
                <img
                    src='/mobileback.jpg'
                    alt='Mobile Background'
                    className='w-full h-full object-cover md:hidden'
                />
            </div>

            {/* Content */}
            <div className='relative z-20 flex flex-col justify-end pb-32 h-full px-8 md:px-16 lg:px-24 text-white'>
               

                <h1 className='text-4xl md:text-6xl lg:text-5xl font-bold max-w-2xl leading-tight drop-shadow-xl animate-slideUp'>
                    From the World of John Wick: <span className="text-primary">Ballerina</span>
                </h1>

                {/* Meta Info */}
                <div className='flex flex-wrap items-center gap-4 mt-4 text-gray-200 text-sm md:text-base'>
                    <span className='px-3 py-1 rounded-full bg-white/10 backdrop-blur-md'>
                        Action | Adventure | Superhero
                    </span>
                    <div className='flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md'>
                        <Calendar1Icon className='w-4 h-4 mr-1' /> 2022
                    </div>
                    <div className='flex items-center px-3 py-1 rounded-full bg-white/10 backdrop-blur-md'>
                        <ClockIcon className='w-4 h-4 mr-1' /> 2hr 5min
                    </div>
                </div>

                {/* Description */}
                <p className='mt-4 max-w-lg md:max-w-xl lg:max-w-2xl text-gray-300 leading-relaxed animate-fadeIn delay-200'>
                    Trained in the assassin traditions of the Ruska Roma, Eve Macarro takes on an army of killers as she seeks revenge against those responsible for the death of her father.
                </p>

                {/* CTA Button */}
                <button
                    onClick={() => navigate('/movies')}
                    className='mt-8 flex items-center px-6 py-3 text-lg w-52 font-medium bg-primary hover:bg-primary-dull transition-all duration-300 rounded-full shadow-lg hover:scale-105'
                >
                    Explore Movies
                    <ArrowRight className='w-5 h-5 ml-2' />
                </button>
            </div>
        </div>

    )
}

export default HeroSection
