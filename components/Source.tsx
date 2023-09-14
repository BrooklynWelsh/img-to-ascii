import Link from "next/link"
import Image from "next/image"

export default function Source () {
    return (
        <div className="w-[100%] px-20 pb-10 flex justify-center  mt-32 ">
            <Link
                href="https://github.com/BrooklynWelsh/img-to-ascii"
                className="flex items-center space-x-2"
            >
                <Image
                src="/img-to-ascii/github.svg"
                alt="GitHub Logo"
                width={24}
                height={24}
                priority
                />
                <p className="font-light">Source</p>
            </Link>
        </div>
    )
}