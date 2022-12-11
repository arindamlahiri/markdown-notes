import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate } from "react-router-dom";
import { useNote } from "../hooks/useNote";

interface NoteProps {
	onDelete: (id: string) => void;
}

const Note = ({ onDelete }: NoteProps) => {
	const note = useNote();
	const navigate = useNavigate();

	const onDeleteClick = () => {
		onDelete(note.id);
		navigate("/");
	};

	return (
		<>
			<Row className="align-items-center mb-4">
				<Col>
					<h1>{note.title}</h1>
					{/* // TODO: extract to a common component for tag badges */}
					{note.tags.length > 0 ? (
						<Stack
							gap={1}
							direction="horizontal"
							className="flex-wrap"
						>
							{note.tags.map((tag) => (
								<Badge className="text-truncate" key={tag.id}>
									{tag.label}
								</Badge>
							))}
						</Stack>
					) : null}
				</Col>
				<Col xs="auto">
					<Stack gap={2} direction="horizontal">
						<Link to="edit">
							<Button variant="primary">Edit</Button>
						</Link>
						<Button
							variant="outline-danger"
							onClick={onDeleteClick}
						>
							Delete
						</Button>
						<Link to="/">
							<Button variant="outline-secondary">Back</Button>
						</Link>
					</Stack>
				</Col>
			</Row>
			<ReactMarkdown>{note.markdown}</ReactMarkdown>
		</>
	);
};

export default Note;
