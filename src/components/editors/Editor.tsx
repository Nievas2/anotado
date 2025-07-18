"use client" // this registers <Editor> as a Client Component
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/core/fonts/inter.css"
import "@blocknote/mantine/style.css"

// Our <Editor> component we can reuse later
export default function Editor({ id }: { id: string }) {
  // Creates a new editor instance.
  const editor = useCreateBlockNote()

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView title="Anotado" editor={editor} className="p-4 w-full" />
  )
}
