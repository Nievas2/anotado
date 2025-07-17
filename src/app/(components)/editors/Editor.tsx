"use client" // this registers <Editor> as a Client Component
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/mantine/style.css";

// Our <Editor> component we can reuse later
export default function Editor() {
  // Creates a new editor instance.
  const editor = useCreateBlockNote()
  editor.document.push({
    id: "9ee723fd-79b3-4770-bbdb-29e40d04fd34",
    type: "paragraph",
    props: {
      textColor: "default",
      backgroundColor: "default",
      textAlignment: "left",
    },
    content: [
      {
        type: "text",
        text: "t",
        styles: {},
      },
    ],
    children: [],
  })
  editor.onChange((e) => {
    console.log(e.document)
  })
  // Renders the editor instance using a React component.
  return <BlockNoteView title="Anotado" editor={editor} className="p-4 w-full" />
}
