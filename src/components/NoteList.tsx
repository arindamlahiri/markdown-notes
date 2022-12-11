import { useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import { Note, Tag } from "../types";
import EditTagsModal from "./EditTagsModal";
import NoteCard from "./NoteCard/NoteCard";

interface NoteListProps {
	notes: Note[];
	availableTags: Tag[];
	onEditTag: (id: string, label: string) => void;
	onDeleteTag: (id: string) => void;
}
const NoteList = ({
	notes,
	availableTags,
	onEditTag,
	onDeleteTag
}: NoteListProps) => {
	const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
	const [title, setTitle] = useState("");
	const [showEditTagsModal, setShowEditTagsModal] = useState(false);

	const filteredNotes = notes.filter((note) => {
		const isTitleMatch =
			title === "" ||
			note.title.toLowerCase().includes(title.toLowerCase());
		const isTagMatch = selectedTags.every((tag) =>
			note.tags.some((noteTag) => noteTag.id === tag.id)
		);
		return isTitleMatch && isTagMatch;
	});

	return (
		<>
			<Row className="align-items-center mb-4">
				<Col>
					<h1>Notes</h1>
				</Col>
				<Col xs="auto">
					<Stack gap={2} direction="horizontal">
						<Link to="new">
							<Button variant="primary">Create</Button>
						</Link>
						<Button
							variant="outline-secondary"
							onClick={() => setShowEditTagsModal(true)}
						>
							Edit tags
						</Button>
					</Stack>
				</Col>
			</Row>
			<Form>
				<Row className="mb-4">
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								type="text"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							{/* // TODO Pass same format of tags to the select without formatting */}
							<ReactSelect
								isMulti
								options={availableTags.map((tag) => ({
									label: tag.label,
									value: tag.id
								}))}
								value={selectedTags.map((tag) => ({
									label: tag.label,
									value: tag.id
								}))}
								onChange={(tags) => {
									setSelectedTags(
										tags.map((tag) => ({
											label: tag.label,
											id: tag.value
										}))
									);
								}}
							/>
						</Form.Group>
					</Col>
				</Row>
			</Form>
			<Row xs={1} sm={2} lg={3} xl={4} className="g-3">
				{filteredNotes.map((note) => (
					<Col key={note.id}>
						<NoteCard note={note} />
					</Col>
				))}
			</Row>
			<EditTagsModal
				show={showEditTagsModal}
				handleClose={() => setShowEditTagsModal(false)}
				availableTags={availableTags}
				onEditTag={onEditTag}
				onDeleteTag={onDeleteTag}
			/>
		</>
	);
};

export default NoteList;
