'use client'

import { useState, useCallback, useMemo, ChangeEvent } from 'react'
import toast from 'react-hot-toast'
import {red, green, blue, charWidth} from './Sliders'

export default function Uploader({saving, fileLink, disableButton, updateFileLink}: {saving: boolean, fileLink: string, disableButton: Function, updateFileLink: Function}) {
  const [data, setData] = useState<{
    image: string | null
  }>({
    image: null,
  })
  const [file, setFile] = useState<File | null>(null)

  const [dragActive, setDragActive] = useState(false)

  const onChangePicture = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      disableButton(true)
      const file = event.currentTarget.files && event.currentTarget.files[0]
      if (file) {
        if (file.size / 1024 / 1024 > 50) {
          toast.error('File size too big (max 50MB)')
        } else {
          setFile(file)
          const reader = new FileReader()
          reader.onload = (e) => {
            const canvas: HTMLCanvasElement = document.getElementById('canvas') as HTMLCanvasElement
            const onscreenCtx = canvas.getContext('2d')!
            const memCanvas = document.createElement('canvas')
            if (canvas) {
              const imageArray = new Uint8Array(reader.result as ArrayBuffer)
              const imageHeader = imageArray.subarray(0,4)
              let header = "";
              for(let i = 0; i < imageHeader.length; i++) {
                header += imageHeader[i].toString(16);
              }
              //TODO: Use header to validate that file is actually an image type and not just renamed to look like one.
              console.log(header)
              const img = new Image()
              const blob = new Blob([reader.result as ArrayBuffer])
              img.src = URL.createObjectURL(blob)
              img.onload = function () {
                const ctx: CanvasRenderingContext2D = memCanvas.getContext('2d') as CanvasRenderingContext2D
                memCanvas.width = img.width
                memCanvas.height = img.height
                ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, memCanvas.width, memCanvas.height)
                const imageData = ctx.getImageData(0, 0, img.width, img.height)
                const canvasParent = canvas.parentElement?.getBoundingClientRect()!
                
                // Step through image data 4 spots at a time to edit each r,g,b,a set
                const webWorker = new Worker(new URL('./convert-image.ts', import.meta.url))
                const resolutionSlider = document.getElementById('resolution')! as HTMLInputElement
                webWorker.postMessage({imageData, cellSize: parseInt(resolutionSlider.value)})
                console.log('started worker')

                webWorker.onmessage = function(e) {
                  const blobUrl = e.data.blobUrl
                  console.log(blobUrl)
                  const downloadButton = document.getElementById('download')
                  const asciiImageData = e.data.asciiImageData
                  
                  // Now draw to preview canvas
                  createImageBitmap(asciiImageData)
                    .then((asciiBitmap) => {
                      canvas.height = asciiBitmap.height
                      canvas.width = asciiBitmap.width
                      onscreenCtx.drawImage(asciiBitmap, 0, 0, canvas.width, canvas.height)
                      console.log('draw done')
                      updateFileLink(blobUrl)
                      disableButton(false)
                    })
                }
              }
              
            } else {
              toast.error('Error getting image canvas!')
            }
            setData((prev) => ({ ...prev, image: e.target?.result as string }))
          }
          reader.readAsArrayBuffer(file)
        }
      }
    },
    [setData]
  )

  return (
    <>
    <form
      id='downloadLinkForm'
      className="grid gap-24 h-[100%]"
      method='GET'
      target="_blank"
      action={fileLink}
      onSubmit={async (e) => {
        window.open(fileLink)
        disableButton(false)
      }}
    >
      <div className="h-[70vh] text-center">
        <label
          htmlFor="image-upload"
          className="group relative mt-2 flex w-full max-h-[100%] h-[100%] cursor-pointer flex-col items-center justify-center rounded-md border border-gray-300 bg-white shadow-sm transition-all hover:bg-gray-50"
        >
          <div
            className="absolute z-[5] h-full w-full rounded-md"
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(true)
            }}
            onDragEnter={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(true)
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(false)
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setDragActive(false)

              const file = e.dataTransfer.files && e.dataTransfer.files[0]
              if (file) {
                if (file.size / 1024 / 1024 > 50) {
                  toast.error('File size too big (max 50MB)')
                } else {
                  setFile(file)
                  const reader = new FileReader()
                  reader.onload = (e) => {
                    setData((prev) => ({
                      ...prev,
                      image: e.target?.result as string,
                    }))
                  }
                  reader.readAsDataURL(file)
                }
              }
            }}
          />
          <div
            className={`${
              dragActive ? 'border-2 border-black' : ''
            } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all 
                'bg-white opacity-100 hover:bg-gray-50'
            `}
          >
            <svg
              className={`${
                dragActive ? 'scale-110' : 'scale-100'
              } h-7 w-7 text-gray-500 transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
              <path d="M12 12v9"></path>
              <path d="m16 16-4-4-4 4"></path>
            </svg>
            <p className="mt-2 text-center text-sm text-gray-500">
              Click to upload.
            </p>
            <p className="mt-2 text-center text-sm text-gray-500">
              Max file size: 50MB
            </p>
            <span className="sr-only">Photo upload</span>
          </div>
          <canvas id="canvas" className="max-w-[100%] max-h-[100%]"/>
        </label>
        <div className="mt-1 flex rounded-md shadow-sm">
          <input
            id="image-upload"
            name="image"
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={onChangePicture}
          />
        </div>
      </div>
    </form>
    </>
  )
}
