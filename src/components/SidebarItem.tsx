"use client"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { Icon } from "@iconify/react/dist/iconify.js"
import { useEffect, useRef, useState } from "react"
import { useNoteStore } from "@/stores/notes.store"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import Link from "next/link"

const SidebarItem = ({
  note,
  open,
  noteId,
}: {
  note: { id: string; title: string }
  open: boolean
  noteId: string | null
}) => {
  const { updateNote, deleteNote } = useNoteStore()
  const [isEditing, setIsEditing] = useState(false)
  const [inputValue, setInputValue] = useState(note.title)
  const inputRef = useRef<HTMLInputElement>(null)

  // Focus automático cuando se activa el modo de edición
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleSave = () => {
    console.log(inputValue.trim())

    // Elimina la tarjeta si está vacía
    if (inputValue.trim() === "") {
      return
    } else {
      // Guarda el contenido editado
      updateNote(note.id, {
        title: inputValue.trim(),
      })
    }
    setIsEditing(false)
  }

  if (isEditing) {
    return (
      <input
        className="w-full p-2 rounded border-none ring-0 outline-none"
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSave()
          if (e.key === "Escape") setIsEditing(false)
        }}
        placeholder="Escribe un nuevo titulo"
        ref={inputRef}
        value={inputValue}
        onBlur={handleSave}
      />
    )
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: note.id })

  const transformYOnly = transform
    ? { ...transform, x: 0 } // elimina movimiento horizontal
    : null

  const style = {
    transform: CSS.Transform.toString(transformYOnly),
    transition,
  }

  return (
    <div
      key={note.id}
      className={`flex items-center justify-center gap-2 p-2 rounded-md w-full ${
        isDragging && "z-[50000]"
      } ${
        note.id === noteId
          ? "bg-blue-300 dark:bg-gray-700 font-bold"
          : "hover:bg-blue-300 dark:hover:bg-gray-700 font-medium"
      }`}
      ref={setNodeRef}
      style={style}
      {...attributes}
      /* onClick={() => handleUpdateNote(note.id)} */
    >
      {open ? (
        <div className="flex items-center justify-between gap-2 w-full group relative">
          <div className="flex gap-1 items-center">
            <span
              {...listeners}
              style={{ touchAction: "none" }}
              className="w-6 cursor-grab active:cursor-grabbing inline-block"
              title="Arrastrar"
            >
              <span className="absolute top-0 opacity-100 sm:group-hover:opacity-100 sm:opacity-0 transition-opacity duration-200">
                ☰
              </span>
              <Icon
                icon="akar-icons:file"
                className="absolute top-0 text-black opacity-0 dark:text-white sm:group-hover:opacity-0 sm:opacity-100 transition-opacity duration-200"
                width="20"
                height="20"
              />
            </span>
            <Link
              className="text-sm text-black dark:text-white cursor-pointer"
              href={`/dashboard?note=${note.id}`}
            >
              {note.title}
            </Link>
          </div>
          <Menu>
            <MenuButton>
              <Icon
                icon="material-symbols:more-vert"
                width="20"
                height="20"
                className="text-black dark:text-white"
              />
            </MenuButton>
            <MenuItems
              transition
              anchor="bottom end"
              className="w-52 origin-top-right rounded-xl border border-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0 z-50 bg-[#1c1c1c]"
            >
              <MenuItem>
                <button
                  className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/30 hover:bg-white/20"
                  onClick={() => {
                    setIsEditing(true)
                  }}
                >
                  <Icon icon="akar-icons:edit" width="20" height="20" />
                  Editar
                  <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                    ⌘E
                  </kbd>
                </button>
              </MenuItem>

              <div className="my-1 h-px bg-white/5" />

              <MenuItem>
                <button
                  className="group flex w-full items-center gap-2 rounded-lg px-3 py-1.5 data-focus:bg-white/30 hover:bg-white/20"
                  onClick={() => {
                    if (note.id === noteId) {
                      window.location.replace(`/dashboard`)
                    }
                    deleteNote(note.id)
                  }}
                >
                  <Icon icon="akar-icons:trash" width="20" height="20" />
                  Eliminar
                  <kbd className="ml-auto hidden font-sans text-xs text-white/50 group-data-focus:inline">
                    ⌘E
                  </kbd>
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      ) : (
        <Link href={`/dashboard?note=${note.id}`}>
          <Icon
            icon="akar-icons:file"
            width="20"
            className="text-black dark:text-white font-bold"
          />
        </Link>
      )}
    </div>
  )
}
export default SidebarItem
