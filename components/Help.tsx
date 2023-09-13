export default function Help () {
    return (
        <>
            <button className="btn mb-24"
                onClick={()=>(document.getElementById('my_modal_5')! as HTMLFormElement).showModal()}>Help</button>
            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Image Control Help</h3>
                    <hr/>

                    <h4 className="pt-4 text-lg font-semibold">Resolution (Font Size)</h4>
                    <p>Controls the size of the characters used to make up the image, smaller characters result in a more detailed image.</p>

                    <h4 className="pt-4 text-lg font-semibold">Scale X/Y</h4>
                    <p>Scales the image up by the multiplier selected. If your image is very small, you can use this to get a larger image that will look sharper at higher resolutions. <br/> 
                        Note that scaling large images or scaling by a large multiplier will increase processing time significantly.</p>

                    <h4 className="pt-4 text-lg font-semibold">Background Color</h4>
                    <p>Currently images are rendered on either a black or white backdrop, try both to see which you prefer.</p>
                    <div className="modal-action">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn mt-8">Close</button>
                    </form>
                    </div>
                </div>
            </dialog>
        </>
    )
}