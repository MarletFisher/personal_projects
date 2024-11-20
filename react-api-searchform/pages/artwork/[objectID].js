import ArtworkCardDetail from "@/components/ArtworkCardDetail";
import { useRouter } from "next/router";
import { Col, Row } from "react-bootstrap";

export default function artworkByID() {
	const router = useRouter();
	const { objectID } = router.query;

	console.log("artwork by ID, objectID from router.query:", objectID);

	return (
		<>
			<Row>
				<Col>
					<ArtworkCardDetail objectID={objectID} />
				</Col>
			</Row>
		</>
	);
}
