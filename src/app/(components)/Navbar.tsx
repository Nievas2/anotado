"use client"

import Link from "next/link"
import IconTheme from "./IconTheme"

const Navbar = () => {
  return (
    <nav className="flex justify-between w-full px-4 p-2 max-w-8xl bg-slate-600">
      <Link href="/" className="text-2xl font-bold p-2">
        <button className="rounded-lg flex items-center justify-center ">
          <span className="text-white font-bold text-sm">Anotado</span>
        </button>
      </Link>
      <IconTheme />
    </nav>
  )
}
export default Navbar
