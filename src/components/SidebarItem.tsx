"use client"
import { Note, useNoteStore } from "@/stores/notes.store"
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react"
import { Icon } from "@iconify/react/dist/iconify.js"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

const SidebarItem = ({
  note,
  open,
  noteId,
}: {
  note: Note
  open: boolean
  noteId: string | null
}) => {
  const { deleteNote } = useNoteStore()
  return (
    <Link
      key={note.id}
      className={`flex items-center justify-center gap-2 p-2 rounded-md cursor-pointer w-full ${
        note.id === noteId
          ? "bg-gray-700 font-bold"
          : "hover:bg-gray-700 font-medium"
      }`}
      href={`/dashboard?note=${note.id}`}
      /* onClick={() => handleUpdateNote(note.id)} */
    >
      {open ? (
        <div className="flex items-center justify-between gap-2 w-full">
          <div className="flex gap-1 items-center">
            <Icon icon="akar-icons:file" width="20" height="20" />
            <span className="text-sm">{note.title}</span>
          </div>
          <Menu>
            <MenuButton>
              <Icon
                icon="material-symbols:more-vert"
                width="20"
                height="20"
                className="text-white"
              />
            </MenuButton>
            <MenuItems
              transition
              anchor="bottom end"
              className="w-52 origin-top-right rounded-xl border border-white/5 p-1 text-sm/6 text-white transition duration-100 ease-out focus:outline-none data-closed:scale-95 data-closed:opacity-0 z-50 bg-[#1c1c1c]"
            >
              {/*  <div className="my-1 h-px bg-white/5" /> */}

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
        <Icon
          icon="akar-icons:file"
          width="20"
          className="text-white font-bold"
        />
      )}
    </Link>
  )
}
export default SidebarItem
