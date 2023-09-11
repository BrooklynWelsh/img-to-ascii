/**
 * Contains sliders that control different options for the ASCII generation
 */
'use client'
import { ChangeEvent, useState } from "react"

export const charWidth = 8
export const charHeight = 8
export const red = 255
export const green = 255
export const blue = 255

export default function Sliders() {
    const [currentRes, setRes] = useState<string>('5 px')
    const handleResChange = (e: ChangeEvent) => {
        const target = e.target as HTMLInputElement
        if (target) {
            if (target.value === '1') setRes('Original Image')
            else setRes(`${target.value} px`)
        }
    }

    return (
        <section>
            <label htmlFor='resolution' id='resolutionLabel'>Resolution: {currentRes}</label>
            <input onChange={(e) => handleResChange(e)} type="range" id='resolution' name='resolution' min='1' max='25' defaultValue='5' />
        </section>
    )
}