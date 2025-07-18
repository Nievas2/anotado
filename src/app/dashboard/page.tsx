"use client"
import Sidebar from "@/components/Sidebar"
import dynamic from "next/dynamic"
import { useMemo } from "react"

const Page = () => {
  const Editor = useMemo(
    () =>
      dynamic(() => import("../../components/editors/Editor"), {
        ssr: false,
      }),
    []
  )
  return (
    <div className="flex w-full bg-[#1F1F1F] relative">
      <Sidebar />
      <Editor />
    </div>
  )
}
export default Page
