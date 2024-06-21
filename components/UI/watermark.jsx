import Image from 'next/image'
import React from 'react'
import logo from '../../assets/3xb.png'
import { Montserrat } from 'next/font/google'

const montserrat = Montserrat({ subsets: ['latin'] })

const Watermark = () => {
return (
<a href='https://www.3xbuilds.com/'
    target='_blank'
    rel='noopener noreferrer' 
 className='fixed bottom-0 right-0 z-[99999999]'>
    <div className='bg-black/60 backdrop-blur-sm px-4 py-1.5 rounded-tl-xl text-white text-xs p-1 flex flex-row gap-4 shadow-xl sha shadow-[#DF759C] translate-x-[124px] duration-300 hover:translate-x-0 cursor-pointer select-none border-[#DF759C] font-bold border-t-[1px] items-center justify-center'>
        <Image src={logo} className='w-4'/>
        <h3 className={montserrat.className}>Built by <span className=' text-[#DF759C]'>3xBuilds</span></h3>
    </div>
</a>
)
}

export default Watermark