"use client" // this registers <Editor> as a Client Component
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/core/fonts/inter.css"
import "@blocknote/mantine/style.css"
import { useEffect, useCallback, useRef, useMemo } from "react"
import { useNoteStore } from "@/stores/notes.store"

// Our <Editor> component we can reuse later
export default function Editor({ id }: { id: string }) {
  const editor = useCreateBlockNote()
  const lastSavedContentRef = useRef<string>("")
  const isSavingRef = useRef(false)
  const getNoteById = useNoteStore((state: any) => state.getNoteById)
  const updateNote = useNoteStore((state: any) => state.updateNote)

  useEffect(() => {
    if (id) {
      const note = getNoteById(id)
      if (note && note.content) {
        // Cargar el contenido de la nota en el editor
        editor.replaceBlocks(editor.document, note.content)
        // Actualizar la referencia del último contenido guardado
        lastSavedContentRef.current = JSON.stringify(note.content)
      }
    }
  }, [id, getNoteById])

  const saveNote = useCallback(
    async (content: any[]) => {
      if (isSavingRef.current) return // Evitar guardados concurrentes

      isSavingRef.current = true

      try {
        updateNote(id, {
          content: content,
        })

        // Actualizar la referencia del último contenido guardado
        lastSavedContentRef.current = JSON.stringify(content)
      } catch (error) {
        console.error("Error saving note:", error)
      } finally {
        isSavingRef.current = false
      }
    },
    [id, updateNote]
  )
  // Función para manejar cambios con debounce inteligente
  const handleChange = useCallback(async () => {
    if (!id) return
    const currentContent = editor.document
    const currentContentString = JSON.stringify(currentContent)
    if (currentContentString === lastSavedContentRef.current) {
      return
    }
    await saveNote(currentContent)
  }, [id, editor])

  // Renders the editor instance using a React component.
  return (
    <BlockNoteView
      title="Anotado"
      editor={editor}
      className="p-4 w-full"
      onChange={handleChange}
    />
  )
}
