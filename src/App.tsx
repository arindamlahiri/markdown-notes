import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "react-bootstrap";
import { Navigate, Route, Routes } from "react-router-dom";
import { v4 as uuidV4 } from "uuid";
import NoteList from "./components/NoteList";
import { useLocalStorage } from "./hooks/useLocalStorage";
import NewNote from "./components/NewNote";
import { Note, NoteData, RawNote, Tag } from "./types";
import NoteLayout from "./components/NoteLayout";
import NoteComponent from "./components/Note";
import EditNote from "./components/EditNote";

// TODO: Move all logic from App to Home component
const App = () => {
	const [notes, setNotes] = useLocalStorage<RawNote[]>("Notes", []);
	const [tags, setTags] = useLocalStorage<Tag[]>("Tags", []);

	const notesWithTags: Note[] = notes.map((note) => ({
		id: note.id,
		title: note.title,
		markdown: note.markdown,
		tags: tags.filter((tag) => note.tagIds.includes(tag.id))
	}));

	const onCreateNote = (noteData: NoteData) => {
		setNotes((prevNotes) => {
			return [
				...prevNotes,
				{
					...noteData,
					id: uuidV4(),
					tagIds: noteData.tags.map((tag) => tag.id)
				}
			];
		});
	};

	const onEditNote = (newNoteData: Note) => {
		setNotes((prevNotes) => {
			return prevNotes.map((prevNote) => {
				if (prevNote.id === newNoteData.id) {
					return {
						...prevNote,
						...newNoteData,
						tagIds: newNoteData.tags.map((tag) => tag.id)
					};
				}

				return prevNote;
			});
		});
	};

	const onDeleteNote = (id: string) => {
		setNotes((prevNotes) => {
			return prevNotes.filter((prevNote) => prevNote.id !== id);
		});
	};

	const onCreateTag = (tag: Tag) => {
		setTags((prevTags) => [...prevTags, tag]);
	};

	const onEditTag = (id: string, label: string) => {
		setTags((prevTags) => {
			return prevTags.map((prevTag) => {
				if (prevTag.id === id) {
					return { ...prevTag, label };
				}
				return prevTag;
			});
		});
	};

	const onDeleteTag = (id: string) => {
		setTags((prevTags) => {
			return prevTags.filter((prevTag) => prevTag.id !== id);
		});
	};

	return (
		<Container className="my-4">
			<Routes>
				<Route
					index
					element={
						<NoteList
							notes={notesWithTags}
							availableTags={tags}
							onEditTag={onEditTag}
							onDeleteTag={onDeleteTag}
						/>
					}
				/>
				<Route
					path="new"
					element={
						<NewNote
							onSubmit={onCreateNote}
							onCreateTag={onCreateTag}
							availableTags={tags}
						/>
					}
				/>
				<Route
					path=":id"
					element={<NoteLayout notes={notesWithTags} />}
				>
					<Route
						index
						element={<NoteComponent onDelete={onDeleteNote} />}
					/>
					<Route
						path="edit"
						element={
							<EditNote
								onSubmit={onEditNote}
								onCreateTag={onCreateTag}
								availableTags={tags}
							/>
						}
					/>
				</Route>
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</Container>
	);
};

export default App;
