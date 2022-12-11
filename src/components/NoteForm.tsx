import { useRef, useState } from "react";
import { Button, Col, Form, Row, Stack } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { v4 as uuidV4 } from "uuid";
import { NoteData, Tag } from "../types";

interface NoteFormProps extends Partial<NoteData> {
	onSubmit: (data: NoteData) => void;
	onCreateTag: (tag: Tag) => void;
	availableTags: Tag[];
}

const NoteForm = ({
	onSubmit,
	onCreateTag,
	availableTags,
	title = "",
	markdown = "",
	tags = []
}: NoteFormProps) => {
	const titleRef = useRef<HTMLInputElement>(null);
	const markdownRef = useRef<HTMLTextAreaElement>(null);
	const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
	const navigate = useNavigate();

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		onSubmit({
			title: titleRef.current?.value || "",
			markdown: markdownRef.current?.value || "",
			tags: selectedTags
		});

		navigate("..");
	};

	return (
		<Form onSubmit={handleSubmit}>
			<Stack gap={4}>
				<Row>
					<Col>
						<Form.Group controlId="title">
							<Form.Label>Title</Form.Label>
							<Form.Control
								required
								ref={titleRef}
								defaultValue={title}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="tags">
							<Form.Label>Tags</Form.Label>
							{/* // TODO Pass same format of tags to the select without formatting */}
							<CreatableReactSelect
								isMulti
								options={availableTags.map((tag) => ({
									label: tag.label,
									value: tag.id
								}))}
								onCreateOption={(label) => {
									const newTag = { id: uuidV4(), label };
									onCreateTag(newTag);
									setSelectedTags((prevTags) => [
										...prevTags,
										newTag
									]);
								}}
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
				<Form.Group controlId="markdown">
					<Form.Label>Body</Form.Label>
					<Form.Control
						required
						as="textarea"
						rows={15}
						ref={markdownRef}
						defaultValue={markdown}
					/>
				</Form.Group>
				<Stack
					direction="horizontal"
					gap={2}
					className="justify-content-end">
					<Button type="submit" variant="primary">
						Save
					</Button>
					<Link to="..">
						<Button type="button" variant="outline-secondary">
							Cancel
						</Button>
					</Link>
				</Stack>
			</Stack>
		</Form>
	);
};

export default NoteForm;
