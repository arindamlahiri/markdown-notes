import NoteForm from "./NoteForm";
import { Note, Tag } from "../types";
import { useNote } from "../hooks/useNote";

interface EditNoteProps {
	onSubmit: (data: Note) => void;
	onCreateTag: (tag: Tag) => void;
	availableTags: Tag[];
}

const EditNote = ({ onSubmit, onCreateTag, availableTags }: EditNoteProps) => {
	const note = useNote();
	return (
		<>
			<h1 className="mb-4">Edit note</h1>
			<NoteForm
				title={note.title}
				markdown={note.markdown}
				tags={note.tags}
				onSubmit={(data) => onSubmit({ id: note.id, ...data })}
				onCreateTag={onCreateTag}
				availableTags={availableTags}
			/>
		</>
	);
};

export default EditNote;
