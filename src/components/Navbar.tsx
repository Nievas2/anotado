"use client"

import Link from "next/link"
import IconTheme from "./IconTheme"

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between w-full px-4 p-2 max-w-8xl h-16 bg-gradient-to-br from-blue-100 via-white to-indigo-200 dark:from-gray-950 dark:to-gray-900">
      <Link href="/" className="text-2xl font-bold p-2">
        <button className="rounded-lg flex items-center justify-center ">
          <span className="text-black dark:text-white font-bold text-sm">Anotado</span>
        </button>
      </Link>
      <IconTheme />
    </nav>
  )
}
export default Navbar
