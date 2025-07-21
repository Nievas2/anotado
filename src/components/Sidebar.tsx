"use client"
import { useNotes, useNoteStore } from "@/stores/notes.store"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useSearchParams } from "next/navigation"
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
  return (
    <aside
      className={`bg-gray-900 h-full transition-all duration-300 top-0 z-40 absolute sm:sticky sm:top-0 ${
        open
          ? "-left-0 w-[260px] sm:w-[420px] sm:max-w-[420px]"
          : "-left-full w-16"
      }`}
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex flex-col gap-2 sticky top-20 w-full h-[88vh]">
        {/* Header */}
        {/* <Link className={`flex items-center justify-center`} href="/dashboard">
          Todos
        </Link>

        <div
          className={`${
            open
              ? "flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-white after:mt-0.5 after:flex-1 after:border-t after:border-white"
              : "hidden"
          }`}
        >
          <p className="mx-1 mb-0 text-center text-xs">
            <span className="text-white">Notas</span>
          </p>
        </div> */}

        {/* Navigation */}
        <nav className="flex flex-col justify-between h-full gap-y-1">
          <div className="flex flex-col gap-1 overflow-y-auto max-h-[400px]">
            {notes.map((note) => (
              <SidebarItem
                key={note.id}
                note={note}
                noteId={noteId}
                open={open}
              />
            ))}
          </div>

          <button
            onClick={handleAddNote}
            className={`flex items-center justify-center gap-2 p-2 rounded-md cursor-pointer hover:bg-gray-700 font-medium text-xs`}
          >
            <Icon icon="akar-icons:plus" width="20" height="20" />
            {open && <span className="text-sm">Nueva nota</span>}
          </button>
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
  )
}
export default Sidebar
