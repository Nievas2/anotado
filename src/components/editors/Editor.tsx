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

  // Refs para manejar el debounce y evitar guardados innecesarios
  const debounceTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const lastSavedContentRef = useRef<string>("")
  const isSavingRef = useRef(false)

  // Obtener la nota desde el store
  const getNoteById = useNoteStore((state: any) => state.getNoteById)
  const updateNote = useNoteStore((state: any) => state.updateNote)

  // Configuración del debounce - puedes ajustar estos valores
  const DEBOUNCE_DELAY = 500 // 500ms
  const TITLE_DEBOUNCE_DELAY = 1000 // 1 segundo para el título (más lento)

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

  // Función para guardar cambios (memoizada)
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

    // Limpiar el timeout anterior
    if (debounceTimeoutRef.current) {
      clearTimeout(debounceTimeoutRef.current)
    }

    // Configurar un nuevo timeout
    debounceTimeoutRef.current = setTimeout(async () => {
      try {
        const currentContent = editor.document
        const currentContentString = JSON.stringify(currentContent)

        // Solo guardar si el contenido realmente cambió
        if (currentContentString === lastSavedContentRef.current) {
          return
        }

        await saveNote(currentContent)
      } catch (error) {
        console.error("Error in handleChange:", error)
      }
    }, DEBOUNCE_DELAY)
  }, [id, editor, saveNote, DEBOUNCE_DELAY])

  // Limpiar recursos cuando el componente se desmonte
  useEffect(() => {
    return () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
      }
    }
  }, [])

  // Guardar automáticamente cuando el usuario deja de escribir por más tiempo
  useEffect(() => {
    const handleBeforeUnload = () => {
      if (debounceTimeoutRef.current) {
        clearTimeout(debounceTimeoutRef.current)
        // Forzar guardado inmediato antes de salir
        const currentContent = editor.document
        const currentContentString = JSON.stringify(currentContent)

        if (currentContentString !== lastSavedContentRef.current) {
          // Guardado síncrono de emergencia
          updateNote(id, {
            content: currentContent,
            title: "Guardado automático",
          })
        }
      }
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => window.removeEventListener("beforeunload", handleBeforeUnload)
  }, [id, editor, updateNote])

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
