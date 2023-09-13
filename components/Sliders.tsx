/**
 * Contains sliders that control different options for the ASCII generation
 */
'use client'
import Link from "next/link"
import Image from "next/image"
import { ChangeEvent, useMemo, useState } from "react"
import LoadingDots from './loading-dots'

export default function Sliders({saving, fileLink}: {saving: boolean, fileLink: string | undefined}) {
    const [currentRes, setRes] = useState<string>('5 px')
    const handleResChange = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement
        if (target) {
            if (target.value === '1') setRes('Original Image')
            else setRes(`${target.value} px`)
        }
    }

    const [xScale, setXScale] = useState<number>(1)
    const handleXScaleChange = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement
        if (target) {
            setXScale(parseFloat(target.value))
        }
    }

    const [yScale, setYScale] = useState<number>(1)
    const handleYScaleChange = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement
        if (target) {
            setYScale(parseFloat(target.value))
        }
    }

    const saveDisabled = useMemo(() => {
        return !fileLink
      }, [fileLink])

    return (
        <section className="w-80 flex flex-col self-start text-center h-screen">
            <h2 className="text-2xl md:text-3xl mb-4 mt-12">Image Controls</h2>
            <hr className="block border-black mb-24"/>
            <label htmlFor='resolution' id='resolutionLabel'>Resolution (Font size): {currentRes}</label>
            <input onChange={(e) => handleResChange(e)} className="mb-4" type="range" id='resolution' name='resolution' min='1' max='50' defaultValue='5' />

            <label htmlFor='x-scale' id='x-scale-label'>Scale (X): {xScale}</label>
            <input onChange={(e) => handleXScaleChange(e)} className="mb-4" type="range" id='x-scale' name='x-scale' min='1' max='10' defaultValue='1.0' step="0.1" />

            <label htmlFor='y-scale' id='y-scale-label'>Scale (Y): {yScale}</label>
            <input onChange={(e) => handleYScaleChange(e)} className="mb-4" type="range" id='y-scale' name='y-scale' min='1' max='10' defaultValue='1.0' step="0.1" />

            <label htmlFor='background-color' id='background-color-label'>Background Color:</label>
            <select id='background-color' name='background-color' className="text-center">
                <option value="white">White</option>
                <option value="black">Black</option>
            </select>


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