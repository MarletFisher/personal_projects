import { favouritesAtom } from "@/store";
import { useAtom } from "jotai";

import ArtworkCard from "@/components/ArtworkCard";
import { Col, Row } from "react-bootstrap";

export default function Favourites() {
	const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);

	return (
		<>
			<h4>Favourites page</h4>
			<br />
			<br />

			{favouritesList.length == 0 && (
				<p>
					<b>Nothing here</b>, try adding some favourites!
				</p>
			)}

			{favouritesList.length > 0 && (
				<Row className="gy-4">
					{favouritesList.map((objID) => (
						<Col lg={3} key={objID}>
							<ArtworkCard objectID={objID} />
						</Col>
					))}
				</Row>
			)}
		</>
	);
}
