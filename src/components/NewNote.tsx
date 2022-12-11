import NoteForm from "./NoteForm";
import { NoteData, Tag } from "../types";

interface NewNoteProps {
	onSubmit: (data: NoteData) => void;
	onCreateTag: (tag: Tag) => void;
	availableTags: Tag[];
}

const NewNote = ({ onSubmit, onCreateTag, availableTags }: NewNoteProps) => {
	return (
		<>
			<h1 className="mb-4">New note</h1>
			<NoteForm
				onSubmit={onSubmit}
				onCreateTag={onCreateTag}
				availableTags={availableTags}
			/>
		</>
	);
};

export default NewNote;
