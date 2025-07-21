"use client"
import { useEffect, useCallback, useRef, useMemo, useState } from "react"
import { BlockNoteEditor, PartialBlock } from "@blocknote/core"
import { useNoteStore } from "@/stores/notes.store"
import { BlockNoteView } from "@blocknote/mantine"
import debounce from "lodash.debounce"
import "@blocknote/core/fonts/inter.css"
import "@blocknote/mantine/style.css"
import { Icon } from "@iconify/react/dist/iconify.js"
import { Tooltip } from "react-tooltip"

export default function Editor({ id }: { id: string }) {
  const getNoteById = useNoteStore((state: any) => state.getNoteById)
  const updateNote = useNoteStore((state: any) => state.updateNote)
  const lastSavedContentRef = useRef<string>("")
  const isSavingRef = useRef(false)

  const [initialContent, setInitialContent] = useState<PartialBlock[] | null>(
    null
  )
  const [showImportModal, setShowImportModal] = useState(false)
  const [importText, setImportText] = useState("")
  const [importError, setImportError] = useState("")

  // Obtener el contenido al montar
  useEffect(() => {
    if (id) {
      const note = getNoteById(id)
      setInitialContent(note?.content || [])
      if (note?.content) {
        lastSavedContentRef.current = JSON.stringify(note.content)
      }
    }
  }, [id, getNoteById])

  // Crear editor solo cuando se tiene el contenido cargado
  const editor = useMemo(() => {
    if (initialContent === null) return undefined
    return BlockNoteEditor.create({ initialContent })
  }, [initialContent])

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
    () => debounce(async (content: any[]) => await saveNote(content), 1000),
    [saveNote]
  )

  useEffect(() => {
    return () => {
      debouncedSave.cancel()
    }
  }, [debouncedSave])

  const handleChange = useCallback(() => {
    if (!id || !editor) return
    const currentContent = editor.document
    const currentContentString = JSON.stringify(currentContent)

    if (currentContentString === lastSavedContentRef.current) return

    debouncedSave(currentContent)
  }, [id, editor, debouncedSave])

  // Función para manejar la importación
  const handleImport = useCallback(() => {
    if (!importText.trim()) {
      setImportError("El contenido no puede estar vacío")
      return
    }

    try {
      // Intentar parsear como JSON primero (para contenido exportado como JSON)
      let newContent: PartialBlock[]

      try {
        newContent = JSON.parse(importText)
        if (!Array.isArray(newContent)) {
          throw new Error("Invalid format")
        }
      } catch {
        // Si no es JSON válido, crear un bloque de párrafo simple con el texto
        newContent = [
          {
            type: "paragraph",
            content: [{ type: "text", text: importText, styles: {} }],
          },
        ]
      }

      // Reemplazar el contenido en el editor
      if (editor) {
        editor.replaceBlocks(editor.document, newContent)
        // Guardar inmediatamente
        saveNote(newContent)
      }

      // Cerrar modal y limpiar
      setShowImportModal(false)
      setImportText("")
      setImportError("")
    } catch (error) {
      setImportError("Error al procesar el contenido. Verifica el formato.")
    }
  }, [importText, editor, saveNote])

  const handleImportModalClose = useCallback(() => {
    setShowImportModal(false)
    setImportText("")
    setImportError("")
  }, [])

  if (!editor) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        Cargando nota...
      </div>
    )
  }

  /* export function */
  function ExportCopy() {
    const [copied, setCopied] = useState("")

    const handleCopy = () => {
      if (!editor) return setCopied("Ha ocurrido un problema")

      const currentContent = editor.document
      const contentString = JSON.stringify(currentContent, null, 2)

      navigator.clipboard.writeText(contentString)
      setCopied("¡Copiado!")
      setTimeout(() => setCopied(""), 1500)
    }

    return (
      <>
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 p-2 rounded-md cursor-pointer bg-gray-700/80 hover:bg-gray-700 font-medium"
          data-tooltip-id="export-tooltip"
          data-tooltip-content={copied || "Copiar contenido"}
          aria-label="Exportar nota"
          type="button"
        >
          <Icon icon="material-symbols:content-copy" width="20" height="20" />
          {copied === "¡Copiado!" ? (
            <span className="text-green-500">{copied}</span>
          ) : (
            <span>Exportar</span>
          )}
        </button>
        <Tooltip
          id="export-tooltip"
          place="bottom"
          style={{ fontSize: "0.8rem" }}
        />
      </>
    )
  }

  return (
    <section className="flex flex-col gap-2 h-full w-full bg-[#1F1F1F]">
      <div className="flex items-center justify-end gap-6 p-2">
        <ExportCopy />
        <button
          onClick={() => setShowImportModal(true)}
          className="flex items-center justify-center gap-2 p-2 rounded-md cursor-pointer bg-gray-700/80 hover:bg-gray-700 font-medium"
        >
          <Icon icon="material-symbols:upload" width="20" height="20" />
          Importar
        </button>
      </div>

      <BlockNoteView
        title="Anotado"
        editor={editor}
        className="p-4 w-full"
        onChange={handleChange}
      />

      {/* Modal de Importación */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#2A2A2A] rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">
                Importar Contenido
              </h2>
              <button
                onClick={handleImportModalClose}
                className="text-gray-400 hover:text-white"
              >
                <Icon icon="material-symbols:close" width="24" height="24" />
              </button>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Pega aquí el contenido exportado o texto plano:
              </label>
              <textarea
                value={importText}
                onChange={(e) => {
                  setImportText(e.target.value)
                  if (importError) setImportError("")
                }}
                className="w-full h-40 p-3 bg-[#1F1F1F] border border-gray-600 rounded-md text-white resize-none focus:outline-none focus:border-blue-500"
                placeholder="Pega aquí tu contenido..."
              />
              {importError && (
                <p className="text-red-400 text-sm mt-2">{importError}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={handleImportModalClose}
                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleImport}
                disabled={!importText.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-md transition-colors"
              >
                Importar
              </button>
            </div>

            <div className="mt-4 p-3 bg-[#1A1A1A] rounded-md">
              <p className="text-xs text-gray-400">
                <strong>Tip:</strong> Puedes pegar contenido exportado desde
                esta aplicación (formato JSON) o simplemente texto plano que
                será convertido automáticamente.
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
