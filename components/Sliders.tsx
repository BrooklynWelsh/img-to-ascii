/**
 * Contains sliders that control different options for the ASCII generation
 */
'use client'
import Link from "next/link"
import Image from "next/image"
import { ChangeEvent, useMemo, useState } from "react"
import LoadingDots from './loading-dots'

export const charWidth = 8
export const charHeight = 8
export const red = 255
export const green = 255
export const blue = 255

export default function Sliders({saving, fileLink}: {saving: boolean, fileLink: string | undefined}) {
    const [currentRes, setRes] = useState<string>('5 px')
    const handleResChange = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement
        if (target) {
            if (target.value === '1') setRes('Original Image')
            else setRes(`${target.value} px`)
        }
    }
    const saveDisabled = useMemo(() => {
        return !fileLink
      }, [fileLink])

    return (
        <section className="w-80 flex flex-col self-start text-center h-screen">
            <h2 className="text-2xl md:text-3xl mb-4 mt-12">Image Controls</h2>
            <hr className="block border-black mb-24"/>
            <label htmlFor='resolution' id='resolutionLabel'>Resolution: {currentRes}</label>
            <input onChange={(e) => handleResChange(e)} type="range" id='resolution' name='resolution' min='1' max='25' defaultValue='5' />

            <button
                form='downloadLinkForm'
                disabled={saveDisabled}
                className={`${
                saveDisabled
                    ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
                    : 'border-black bg-black text-white hover:bg-white hover:text-black'
                } flex h-10 items-center justify-center rounded-md border text-sm transition-all focus:outline-none mt-32 mx-4`}
            >
                {saving ? (
                <LoadingDots color="#808080" />
                ) : (
                <p className="text-sm">View/Download full image</p>
                )}
            </button>
            
            <div className="w-[100%] px-20 pb-10 flex justify-between place-self-end mt-auto ">
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
    )
}