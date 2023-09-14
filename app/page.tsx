'use client'
import Uploader from '@/components/uploader'
import { Toaster } from '@/components/toaster'
import Sliders from '@/components/Sliders'
import { useState } from 'react'
import React from 'react'
import Source from '@/components/Source'

export default function Home() {
  const [saving, setSaving] = useState(false)
  const [fileLink, setLink] = useState<string | undefined>(undefined)
  const [hidden, setHidden] = useState(true)

  const [width, setWidth] = React.useState(window.innerWidth)

  React.useEffect(() => {
    if (window) {
      const handleWindowResize = () => setWidth(window.innerWidth)
      window.addEventListener("resize", handleWindowResize)

      // Return a function from the effect that removes the event listener
      return () => window.removeEventListener("resize", handleWindowResize)
    }
  }, []);

  const toggleMenu = (e: React.MouseEvent) => {
    (e.target as HTMLElement).id === 'navbar-burger' ? setHidden(false): setHidden(true)
  }
  
  return (
    <main>
      
      {width < 768 ? 
      <div className="">
      <button id="navbar-burger" className="flex items-center text-blue-600 pl-3 pt-4" onClick={(e: React.MouseEvent<HTMLElement>) => {toggleMenu(e)}}>
        <svg className="pointer-events-none block h-4 w-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <title>Mobile menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
      </button>
    </div>
    : null}

      <h1 className="md:hidden pt-4 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-2xl font-medium tracking-tight text-transparent">
         Image to ASCII converter
        </h1>
      <section className="relative flex min-h-screen h-screen flex-col md:flex-row items-center md:justify-center">
      <Toaster />
      { width >= 768 ?
        
        <div className="md:block">
          <Sliders saving={saving} fileLink={fileLink}/>
        </div> : null
      }
        
        <div className="flex flex-col bg-white/30 px-4 md:px-12 shadow-xl ring-1 ring-gray-900/5 rounded-lg backdrop-blur-lg max-w-full max-h-full md:h-screen  min-h-0 mt-4 md:mt-0 md:mr-14 w-full">
        <h1 className="hidden md:block pt-4 pb-8 bg-gradient-to-br from-black via-[#171717] to-[#575757] bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent xl:text-7xl">
         Image to ASCII converter
        </h1>
        <div className="space-y-1 mb-4 text-center">
          <h2 className="md:text-xl font-semibold">Click canvas to upload a file.</h2>
          <h3 className="hidden md:block md:text-lg font-medium">Images in canvas are previews, download link will keep original file dimensions (or scale up with slider values).</h3>
          <p className="text-sm text-gray-500">
            Accepted formats: .png, .jpg
          </p>
        </div>
          <Uploader saving={saving} fileLink={fileLink} disableButton={(disable: boolean) => setSaving(disable)} updateFileLink={(newLink: string) => setLink(newLink)}/>
        </div>
      </section>
      { width < 768 ?
      
      <div id="navbar" className={`${hidden ? 'hidden' : ''} md:hidden relative`}>
        <nav className="fixed top-0 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto">
          <div className="flex items-center mb-8">
            <button id="navbar-close" onClick={(e: React.MouseEvent<HTMLElement>) => {toggleMenu(e)}}>
              <svg className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          <div className="w-[100%]">
            <Sliders saving={saving} fileLink={fileLink}/>
          </div>
          <div className="md:hidden mt-auto">
            <Source/>
          </div>
        </nav>
      </div>
       : null
      }
    </main>
  )
}
