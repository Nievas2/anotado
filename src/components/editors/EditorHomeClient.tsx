"use client"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/core/fonts/inter.css"
import "@blocknote/mantine/style.css"

export default function EditorHome() {
  const editor = useCreateBlockNote({
    initialContent: [
      {
        type: "heading",
        content: "Anotado",
      },
      {
        type: "paragraph",
        content:
          "Anotado es una sencilla app para tomar notas, desarrollada con BlockNote.",
      },
      {
        type: "paragraph",
        content: "Explora las funciones y personaliza tus notas.",
      },
      {
        type: "paragraph",
        content: "¡Que disfrutes tomando notas!",
      },
      {
        type: "paragraph",
        content: "",
      },
    ],
  })
  // Guarda el contenido anterior para poder volver si se pasa de 8
  let previousContent = editor.document

  editor.onChange(() => {
    const length = editor.document.length

    if (length > 8) {
      // Revertimos al estado anterior si se excede el límite
      editor.replaceBlocks(editor.document, previousContent)
    } else {
      // Guardamos el contenido válido actual
      previousContent = editor.document
    }
  })
  if (!editor) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Cargando editor...
      </div>
    )
  }
  return (
    <BlockNoteView title="Anotado" editor={editor} className="p-4 w-full" />
  )
}
