import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Tag } from "../types";

interface EditTagsModalProps {
	show: boolean;
	handleClose: () => void;
	availableTags: Tag[];
	onEditTag: (id: string, label: string) => void;
	onDeleteTag: (id: string) => void;
}

const EditTagsModal = ({
	show,
	handleClose,
	availableTags,
	onEditTag,
	onDeleteTag
}: EditTagsModalProps) => {
	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edit tags</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form>
					<Stack gap={2}>
						{availableTags.map((tag) => (
							<Row key={tag.id}>
								<Col>
									<Form.Control
										type="text"
										value={tag.label}
										onChange={(e) =>
											onEditTag(tag.id, e.target.value)
										}
									/>
								</Col>
								<Col xs="auto">
									<Button
										variant="outline-danger"
										onClick={() => onDeleteTag(tag.id)}
									>
										&times;
									</Button>
								</Col>
							</Row>
						))}
					</Stack>
				</Form>
			</Modal.Body>
		</Modal>
	);
};

export default EditTagsModal;
