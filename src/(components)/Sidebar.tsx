import { useNoteActions, useNotes } from "@/stores/notes.store"

const Sidebar = () => {
  const notes = useNotes()
  const { addNote, updateNote, deleteNote } = useNoteActions()

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

  return (
    <div>
      <button onClick={handleAddNote}>Agregar Nota</button>
      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>Creada: {note.createdAt.toLocaleDateString()}</p>
          <button onClick={() => handleUpdateNote(note.id)}>Actualizar</button>
          <button onClick={() => deleteNote(note.id)}>Eliminar</button>
        </div>
      ))}
    </div>
  )
}
export default Sidebar
