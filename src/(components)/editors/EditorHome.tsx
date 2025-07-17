"use client"
import dynamic from "next/dynamic"
import React, { useMemo } from "react"

export default function EditorHome() {
  const EditorHomeClient = useMemo(
    () =>
      dynamic(() => import("./EditorHomeClient"), {
        ssr: false,
      }),
    []
  )
  return <EditorHomeClient />
}
