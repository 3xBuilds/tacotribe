import Image from 'next/image'
const loaderGif = "https://tacotribe.s3.ap-south-1.amazonaws.com/assets/ui/loader.gif"

export default function Loading() {
    // Or a custom loading skeleton component
    return (
        <div className='absolute top-0 left-0 z-[9999]'>
            <div className='absolute w-screen h-screen bg-yellow-400 flex flex-col items-center justify-center top-0 left-0'>
                <Image src={loaderGif} width={800} height={800} alt="" className='w-80'/>
                <h3 className='text-5xl text-black'>Loading...</h3>
            </div>
        </div>
    )
  }