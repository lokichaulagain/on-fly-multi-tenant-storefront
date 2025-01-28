import React from 'react'
import Image from 'next/image'

type Props = {}
const middlebanner = "https://miniture.b-cdn.net/wp-content/uploads/2023/10/m1_slide_03.jpeg"          

export default function MiddleBannerSection({}: Props) {
  return (
    <div className='mt-20'>
        <Image src={middlebanner} alt="middlebanner" className="object-cover  md:h-[60vh] rounded-md md:rounded-2xl" height={500} width={1500} />
    </div>
  )
}