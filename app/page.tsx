import Image from 'next/image'
import Link from 'next/link'
import Uploader from '@/components/uploader'
import { Toaster } from '@/components/toaster'
import Sliders from '@/components/Sliders'

export default function Home() {
  return (
    <main>
      <section className="relative flex min-h-screen h-full flex-col md:flex-row items-center justify-center">
        <Toaster />
        <Sliders/>
        <div className="flex flex-col bg-white/30 px-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-full max-h-full h-screen  min-h-0 mr-14 w-full">
        <h1 className="pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent xl:text-7xl">
         Image to ASCII converter
        </h1>
        <div className="space-y-1 mb-4">
          <h2 className="text-xl font-semibold">Click canvas to upload a file.</h2>
          <h3 className="text-lg font-medium">Images in canvas are previews, download link will keep original file dimensions.</h3>
          <p className="text-sm text-gray-500">
            Accepted formats: .png, .jpg
          </p>
        </div>
          <Uploader />
        </div>
      </section>
    </main>
  )
}
