import Error from "next/error";
import Link from "next/link";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useSWR from "swr";

export default function ArtworkCard(props) {
	const { data, error } = useSWR(
		"https://collectionapi.metmuseum.org/public/collection/v1/objects/" +
			props.objectID
	);

	// console.log("In ArtworkCard, error:", error);
	// console.log("? In ArtworkCard, props:", props);

	return (
		<>
			{error && <Error statusCode={404} />}
			{data && (
				<Card style={{ width: "18rem" }}>
					<Card.Img variant="top" src={data.primaryImageSmall} />
					<Card.Body>
						<Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
						<Card.Text>
							Object Date: {data.objectDate ? data.objectDate : "N/A"}
							<br />
							Classification:
							{data.classification ? data.classification : "N/A"}
							<br />
							Medium: {data.medium ? data.medium : "N/A"}
						</Card.Text>
						<Link href={"/artwork/" + data.objectID} passHref>
							<Button variant="primary">{data.objectID}</Button>
						</Link>
					</Card.Body>
				</Card>
			)}
		</>
	);
}
