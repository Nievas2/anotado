"use client"
import { useCreateBlockNote } from "@blocknote/react"
import { BlockNoteView } from "@blocknote/mantine"
import "@blocknote/core/fonts/inter.css"
import "@blocknote/mantine/style.css"
import { useEffect, useCallback, useRef, useMemo } from "react"
import { useNoteStore } from "@/stores/notes.store"
import debounce from "lodash.debounce"

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
        editor.replaceBlocks(editor.document, note.content)
        lastSavedContentRef.current = JSON.stringify(note.content)
      }
    }
  }, [id, getNoteById])

  const saveNote = useCallback(
    async (content: any[]) => {
      if (isSavingRef.current) return
      isSavingRef.current = true

      try {
        updateNote(id, { content })
        lastSavedContentRef.current = JSON.stringify(content)
      } catch (error) {
        console.error("Error saving note:", error)
      } finally {
        isSavingRef.current = false
      }
    },
    [id, updateNote]
  )

  const debouncedSave = useMemo(
    () =>
      debounce(async (content: any[]) => {
        await saveNote(content)
      }, 1000), // ajustá el tiempo si querés (1000ms = 1s)
    [saveNote]
  )

  useEffect(() => {
    return () => {
      debouncedSave.cancel()
    }
  }, [debouncedSave])

  const handleChange = useCallback(() => {
    if (!id) return
    const currentContent = editor.document
    const currentContentString = JSON.stringify(currentContent)

    if (currentContentString === lastSavedContentRef.current) {
      return
    }

    debouncedSave(currentContent)
  }, [id, editor, debouncedSave])

  return (
    <BlockNoteView
      title="Anotado"
      editor={editor}
      className="p-4 w-full"
      onChange={handleChange}
    />
  )
}
