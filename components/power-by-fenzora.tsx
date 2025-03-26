import { Zap } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function PowerByFenzora() {
  return (
    <p className=" flex items-center justify-center gap-1 text-[10px]  bg-blue-500 text-white py-1">
    <Zap size={14} />
    Powered by
    <Link
      prefetch={true}
      target="_blank"
      href="https://fenzora.com"
      className=" font-medium underline ">
      Fenzora
    </Link>
  </p>
  )
}
