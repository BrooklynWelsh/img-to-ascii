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
          <Uploader />
        </div>
        <div className="sm:absolute sm:bottom-0 w-full px-20 pb-10 flex justify-between">
          <Link
            href="https://github.com/vercel/examples/tree/main/storage/blob-starter"
            className="flex items-center space-x-2"
          >
            <Image
              src="/github.svg"
              alt="GitHub Logo"
              width={24}
              height={24}
              priority
            />
            <p className="font-light">Source</p>
          </Link>
        </div>
      </section>
    </main>
  )
}
