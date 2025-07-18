"use client"
import Sidebar from "@/components/Sidebar"
import { Icon } from "@iconify/react/dist/iconify.js"
import dynamic from "next/dynamic"
import { useSearchParams } from "next/navigation"
import { useRouter } from "next/router"
import { useEffect, useMemo, useState } from "react"

const Page = () => {
  const [open, setOpen] = useState(true)
  const note = useSearchParams().get("note")
  const Editor = useMemo(
    () =>
      dynamic(() => import("../../components/editors/Editor"), {
        ssr: false,
      }),
    []
  )
  useEffect(() => {
    console.log("Note ID:", note)
  }, [note])
  return (
    <div className="flex w-full bg-[#1F1F1F] relative">
      <Sidebar open={open} setOpen={setOpen} />
      <button
        onClick={() => setOpen(!open)}
        className={`${
          !open ?
          "absolute left-4 bottom-2 p-2 rounded-md bg-gray-700 cursor-pointer w-fit" :"invisible"
        }`}
      >
        <Icon
          icon="material-symbols:arrow-right-alt-rounded"
          className={open ? "rotate-180" : ""}
          width="20"
          height="20"
        />
      </button>
      <div className="flex flex-col w-full h-full">
        {note ? (
          <Editor id={note} />
        ) : (
          <div className="flex items-center justify-center w-full h-full">
            <h1 className="text-white text-2xl">
              Selecciona una nota para editar
            </h1>
          </div>
        )}
      </div>
    </div>
  )
}
export default Page
