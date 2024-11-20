import Link from "next/link";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import useSWR from "swr";

import { favouritesAtom } from "@/store";
import { useAtom } from "jotai";
import { useState } from "react";

export default function ArtworkCardDetail(props) {
	const { data, error } = useSWR(
		props.objectID
			? "https://collectionapi.metmuseum.org/public/collection/v1/objects/" +
					props.objectID
			: null
	);

	const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
	const [showAdded, setShowAdded] = useState(
		favouritesList.find((objectID) => objectID == props.objectID)
	);

	// console.log("In ArtworkCardDetail, props.objectID:", props.objectID);
	// console.log(
	// 	"In Detail, request made to https://collectionapi.metmuseum.org/public/collection/v1/objects/" +
	// 		props.objectID
	// );
	// console.log("In detail", data);

	const favouritesClicked = () => {
		if (showAdded) {
			setFavouritesList((current) => {
				current.filter((fav) => fav != props.objectID);
			});
			setShowAdded(false);
			console.log("removing", props.objectID);
		} else {
			setFavouritesList((current) => [...current, props.objectID]);
			setShowAdded(true);
			console.log("adding", props.objectID);
		}
		console.log("favourites", favouritesList);
	};

	return (
		<>
			{data && (
				<Card style={{ width: "18rem" }}>
					<Card.Img variant="top" src={data.primaryImage} />
					<Card.Body>
						<Card.Title>{data.title ? data.title : "N/A"}</Card.Title>
						<Card.Text>
							Object Date: {data.objectDate ? data.objectDate : "N/A"}
							<br />
							Classification:{" "}
							{data.classification ? data.classification : "N/A"}
							<br />
							Medium: {data.medium ? data.medium : "N/A"}
							<br />
							<br />
							{data.artistDisplayName ? data.artistDisplayName : "N/A"}
							&nbsp;
							<a
								href={data.artistWikidata_URL}
								target="_blank"
								rel="noreferrer"
							>
								wiki
							</a>
							<br />
							{data.artistDisplayName ? "" : "N/A"}
							<br />
							{data.creditLine ? data.creditLine : "N/A"}
							<br />
							{data.dimensions ? data.dimensions : "N/A"}
							<br />
							<Button
								variant={showAdded ? "primary" : "outline-primary"}
								onClick={favouritesClicked}
							>
								{showAdded ? "+ Favourite (added)" : "+ Favourite"}
							</Button>
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
