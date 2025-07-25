import { StateCreator, create } from "zustand"
import { persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer"

// Tipos para BlockNote - usando el tipo correcto de BlockNote
interface BlockNoteBlock {
  id: string
  type: string
  props?: Record<string, any>
  content?: any
  children?: BlockNoteBlock[]
}

export interface Note {
  id: string
  title: string
  content: BlockNoteBlock[] // Este debe coincidir con el formato de BlockNote
  createdAt: Date
  updatedAt: Date
  tags?: string[]
}

interface NoteState {
  notes: Note[]
  addNote: (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => void
  updateNote: (
    noteId: string,
    updates: Partial<Omit<Note, "id" | "createdAt">>
  ) => void
  createNote: (note: Omit<Note, "id" | "createdAt" | "updatedAt">) => void
  deleteNote: (noteId: string) => void
  getNoteById: (noteId: string) => Note | undefined
  getNotesByTag: (tag: string) => Note[]
  clearAllNotes: () => void
  // Nuevos métodos para BlockNote
  createEmptyNote: () => string // Retorna el ID de la nueva nota
  updateNoteContent: (noteId: string, content: BlockNoteBlock[]) => void
  changeNoteOrder: (noteId: string, newIndex: number) => void
}

const storeApi: StateCreator<NoteState, [["zustand/immer", never]]> = (
  set,
  get
) => ({
  notes: [],

  addNote: (noteData) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...noteData,
    }

    set((state) => {
      state.notes.push(newNote)
    })
  },

  createNote: (noteData) => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...noteData,
    }

    set((state) => {
      state.notes.push(newNote)
    })
  },

  createEmptyNote: () => {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: "Nueva nota",
      content: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      tags: [],
    }

    set((state) => {
      state.notes.push(newNote)
    })

    return newNote.id
  },

  updateNote: (noteId, updates) => {
    set((state) => {
      const noteIndex = state.notes.findIndex(
        (note: { id: string }) => note.id === noteId
      )
      if (noteIndex !== -1) {
        state.notes[noteIndex] = {
          ...state.notes[noteIndex],
          ...updates,
          updatedAt: new Date(),
        }
      }
    })
  },

  updateNoteContent: (noteId, content) => {
    set((state) => {
      const noteIndex = state.notes.findIndex(
        (note: { id: string }) => note.id === noteId
      )
      if (noteIndex !== -1) {
        state.notes[noteIndex].content = content
        state.notes[noteIndex].updatedAt = new Date()
      }
    })
  },

  deleteNote: (noteId) => {
    set((state) => {
      state.notes = state.notes.filter(
        (note: { id: string }) => note.id !== noteId
      )
    })
  },

  getNoteById: (noteId) => {
    return get().notes.find((note) => note.id === noteId)
  },

  getNotesByTag: (tag) => {
    return get().notes.filter((note) => note.tags?.includes(tag))
  },

  clearAllNotes: () => {
    set((state) => {
      state.notes = []
    })
  },

  changeNoteOrder: (noteId, newIndex) => {
    set((state) => {
      /* Note to move */
      const noteIndex = state.notes.findIndex(
        (note: { id: string }) => note.id === noteId
      )
      if (noteIndex !== -1 && newIndex >= 0 && newIndex < state.notes.length) {
        const [movedNote] = state.notes.splice(noteIndex, 1)
        state.notes.splice(newIndex, 0, movedNote)
      }
    })
  },
})

export const useNoteStore = create<NoteState>()(
  persist(immer(storeApi), {
    name: "note-storage",
    // Configuración opcional para manejar la serialización de fechas
    partialize: (state) => ({
      notes: state.notes.map((note) => ({
        ...note,
        createdAt: note.createdAt.toISOString(),
        updatedAt: note.updatedAt.toISOString(),
      })),
    }),
    onRehydrateStorage: () => (state) => {
      // Convertir las fechas de string a Date al rehidratar
      if (state) {
        state.notes = state.notes.map((note) => ({
          ...note,
          createdAt: new Date(note.createdAt),
          updatedAt: new Date(note.updatedAt),
        }))
      }
    },
  })
)

// Hooks personalizados para facilitar el uso
export const useNotes = () => useNoteStore((state) => state.notes)
