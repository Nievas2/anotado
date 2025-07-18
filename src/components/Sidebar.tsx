"use client"
import { useNotes, useNoteStore } from "@/stores/notes.store"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useState } from "react"

const Sidebar = () => {
  const [open, setOpen] = useState(true)
  const notes = useNotes()
  const { addNote, updateNote, deleteNote, createNote } = useNoteStore()
  const handleAddNote = () => {
    addNote({
      title: "Mi nueva nota",
      content: [
        {
          id: "block1",
          type: "paragraph",
          content: [{ type: "text", text: "Contenido de la nota" }],
        },
      ],
      tags: ["importante", "trabajo"],
    })
  }

  const handleUpdateNote = (noteId: string) => {
    updateNote(noteId, {
      title: "Título actualizado",
      content: [
        {
          id: "block1",
          type: "paragraph",
          content: [{ type: "text", text: "Contenido actualizado" }],
        },
      ],
    })
  }

  const handleCreateNote = () => {
    createNote({
      title: "Nueva nota",
      content: [
        {
          id: "block1",
          type: "paragraph",
          content: [{ type: "text", text: "Contenido de la nueva nota" }],
        },
      ],
    })
  }
  return (
    <aside
      className={`bg-gray-900 h-full transition-all duration-300 absolute top-0 z-40 sm:sticky sm:top-0 ${
        open ? "-left-0 w-[260px] sm:w-[420px]" : "-left-full w-16"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col gap-2 sticky top-20 w-full h-[88vh]">
        {/* Header */}
        <div
          className={`flex items-center justify-end sm:justify-start gap-2 px-6 py-4 ${
            open ? "flex" : "hidden"
          }`}
        >
          test
        </div>

        <div
          className={`${
            open
              ? "flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-white after:mt-0.5 after:flex-1 after:border-t after:border-white"
              : "hidden"
          }`}
        >
          <p className="mx-1 mb-0 text-center text-xs">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis dolorum debitis blanditiis voluptate odit corrupti veritatis facere nam autem vel rem ipsam nostrum facilis, exercitationem inventore praesentium. Quia, vel ratione?</p>
        </div>

        {/* Navigation */}
        <nav
          className="flex flex-col h-full gap-y-1 px-3"
        >
          {notes.map((note) => (
            <div
              key={note.id}
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-700 cursor-pointer"
              onClick={() => handleUpdateNote(note.id)}
            >
              <Icon icon="iconamoon:document-fill" width="20" height="20" />
              <span className="text-sm">{note.title}</span>
            </div>
          ))}
        </nav>

        <div
          className={`${
            open
              ? "flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-white after:mt-0.5 after:flex-1 after:border-t after:border-white"
              : "hidden"
          }`}
        ></div>
        {/* Footer */}

        <div
          className="flex justify-end w-full gap-2 p-2 px-3"
        >
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 p-2 rounded-md bg-gray-700 cursor-pointer w-fit"
          >
            <Icon icon="material-symbols:arrow-right-alt-rounded" className={open ? "rotate-180" : ""} width="20" height="20" />
          </button>
        </div>
      </div>
    </aside>
  )
}
export default Sidebar
