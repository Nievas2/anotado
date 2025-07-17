"use client"
import dynamic from "next/dynamic"
import { useMemo } from "react"

const Page = () => {
  const Editor = useMemo(
    () =>
      dynamic(() => import("../(components)/editors/Editor"), {
        ssr: false,
      }),
    []
  )
  return (
    <div className="h-screen w-full bg-[#1F1F1F]">
      <Editor />
    </div>
  )
}
export default Page
