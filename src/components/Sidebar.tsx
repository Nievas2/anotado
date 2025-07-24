"use client"
import { useState, useCallback } from "react"
import { useNotes, useNoteStore } from "@/stores/notes.store"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useSearchParams } from "next/navigation"
import { PartialBlock } from "@blocknote/core"
import SidebarItem from "./SidebarItem"

const Sidebar = ({
  open,
  setOpen,
}: {
  open: boolean
  setOpen: (open: boolean) => void
}) => {
  const { addNote, createNote } = useNoteStore()
  const noteId = useSearchParams().get("note")
  const notes = useNotes()

  const [showImportModal, setShowImportModal] = useState(false)
  const [importText, setImportText] = useState("")
  const [importError, setImportError] = useState("")
  const [importTitle, setImportTitle] = useState("")

  const handleAddNote = () => {
    const noteTitle = "Mi nueva nota"

    addNote({
      title: noteTitle,
      content: [
        {
          id: "block1",
          type: "heading",
          content: [{ type: "text", text: noteTitle }], // ✅ Mismo valor que el título
        },
      ],
      tags: ["importante", "trabajo"],
    })
  }

  const handleCreateNote = () => {
    createNote({
      title: "Nueva nota",
      content: [
        {
          id: "block1",
          type: "heading",
          content: [{ type: "text", text: "Nueva nota" }],
        },
      ],
    })
  }

  // Función para manejar la importación y crear nueva nota
  const handleImport = useCallback(() => {
    if (!importText.trim()) {
      setImportError("El contenido no puede estar vacío")
      return
    }

    if (!importTitle.trim()) {
      setImportError("El título no puede estar vacío")
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
            id: "imported-block-1",
            type: "heading",
            content: [{ type: "text", text: importTitle, styles: {} }],
          },
          {
            id: "imported-block-2",
            type: "paragraph",
            content: [{ type: "text", text: importText, styles: {} }],
          },
        ]
      }

      // Crear nueva nota con el contenido importado
      // Asegurarse de que cada bloque tenga un id definido y cumpla con BlockNoteBlock
      const blockNoteContent = newContent.map((block, idx) => ({
        ...block,
        id: block.id ?? `imported-block-${idx + 1}`,
      })) as any // Si BlockNoteBlock tiene más propiedades requeridas, agregarlas aquí

      addNote({
        title: importTitle,
        content: blockNoteContent,
        tags: ["importada"],
      })

      // Cerrar modal y limpiar
      setShowImportModal(false)
      setImportText("")
      setImportTitle("")
      setImportError("")
    } catch (error) {
      setImportError("Error al procesar el contenido. Verifica el formato.")
    }
  }, [importText, importTitle, addNote])

  const handleImportModalClose = useCallback(() => {
    setShowImportModal(false)
    setImportText("")
    setImportTitle("")
    setImportError("")
  }, [])

  return (
    <>
      <aside
        className={`bg-gradient-to-br from-indigo-100 via-white to-blue-50 dark:from-gray-900 dark:to-gray-800 h-full transition-all duration-300 top-0 z-[45] sm:z-0 absolute sm:sticky sm:top-0 ${
          open
            ? "-left-0 w-[260px] sm:w-[420px] sm:max-w-[420px]"
            : "-left-full w-16"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col gap-2 sticky top-20 w-full h-[88vh]">
          {/* Navigation */}
          <nav className="flex flex-col justify-between h-full gap-y-1">
            <div className="flex flex-col gap-1 overflow-y-auto max-h-[400px]">
              {notes.length > 0 ? (
                notes.map((note) => (
                  <SidebarItem
                    key={note.id}
                    note={note}
                    noteId={noteId}
                    open={open}
                  />
                ))
              ) : (
                <div className="flex items-center justify-center h-full text-gray-800 dark:text-gray-500">
                  <p className="text-sm">No hay notas disponibles</p>
                </div>
              )}
            </div>

            {/* Botones de acción */}
            <div
              className={`flex flex-col gap-1 ${
                open
                  ? "items-start justify-center px-2"
                  : "items-center justify-center"
              }`}
            >
              <button
                onClick={handleAddNote}
                className={`flex ${
                  open
                    ? "items-center justify-start px-2"
                    : "items-center justify-center"
                } gap-2 p-2 rounded-md cursor-pointer dark:hover:bg-gray-700 hover:bg-blue-300 font-medium text-xs text-black dark:text-white w-full`}
              >
                <Icon icon="akar-icons:plus" width="20" height="20" />
                {open && <span className="text-sm">Nueva nota</span>}
              </button>

              <button
                onClick={() => setShowImportModal(true)}
                className={`flex ${
                  open
                    ? "items-center justify-start px-2"
                    : "items-center justify-center"
                } gap-2 p-2 rounded-md cursor-pointer hover:bg-blue-300 dark:hover:bg-gray-700 font-medium text-xs text-black dark:text-white w-full`}
              >
                <Icon icon="material-symbols:upload" width="20" height="20" />
                {open && <span className="text-sm">Importar nota</span>}
              </button>
            </div>
          </nav>

          <div
            className={`${
              open
                ? "flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-white after:mt-0.5 after:flex-1 after:border-t after:border-white"
                : "hidden"
            }`}
          ></div>
          {/* Footer */}

          <div className="flex justify-end w-full gap-2 p-2 px-3 relative">
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 p-2 rounded-md bg-gray-700 cursor-pointer w-fit"
            >
              <Icon
                icon="material-symbols:arrow-right-alt-rounded"
                className={open ? "rotate-180" : ""}
                width="20"
                height="20"
              />
            </button>
          </div>
        </div>
      </aside>

      {/* Modal de Importación */}
      {showImportModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-[#2A2A2A] rounded-lg p-6 w-full max-w-2xl mx-4">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">
                Importar Nueva Nota
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
                Título de la nueva nota:
              </label>
              <input
                type="text"
                value={importTitle}
                onChange={(e) => {
                  setImportTitle(e.target.value)
                  if (importError) setImportError("")
                }}
                className="w-full p-3 bg-[#1F1F1F] border border-gray-600 rounded-md text-white focus:outline-none focus:border-blue-500"
                placeholder="Ej: Nota importada"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Contenido a importar:
              </label>
              <textarea
                value={importText}
                onChange={(e) => {
                  setImportText(e.target.value)
                  if (importError) setImportError("")
                }}
                className="w-full h-40 p-3 bg-[#1F1F1F] border border-gray-600 rounded-md text-white resize-none focus:outline-none focus:border-blue-500"
                placeholder="Pega aquí el contenido exportado o texto plano..."
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
                disabled={!importText.trim() || !importTitle.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-md transition-colors"
              >
                Crear Nota
              </button>
            </div>

            <div className="mt-4 p-3 bg-[#1A1A1A] rounded-md">
              <p className="text-xs text-gray-400">
                <strong>Tip:</strong> Se creará una nueva nota con el título y
                contenido especificados. Puedes pegar contenido exportado (JSON)
                o texto plano que será convertido automáticamente.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Sidebar
