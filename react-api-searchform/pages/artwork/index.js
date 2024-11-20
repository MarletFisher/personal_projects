import ArtworkCard from "@/components/ArtworkCard";
import validObjectIDList from "@/public/data/validObjectIDList.json";
import Error from "next/error";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Col, Pagination, Row } from "react-bootstrap";
import useSWR from "swr";

const PER_PAGE = 12;

export default function artwork() {
	const router = useRouter();
	let finalQuery = router.asPath.split("?")[1];

	// console.log("In artwork page, finalQuery", finalQuery);

	const [artworkList, setArtworkList] = useState([]);
	const [page, setPage] = useState(1);

	const { data, error } = useSWR(
		"https://collectionapi.metmuseum.org/public/collection/v1/search?" +
			finalQuery
	);

	const previousPage = () => {
		if (page > 1) {
			setPage(page - 1);
		}
	};

	const nextPage = () => {
		if (page < artworkList.length) {
			setPage(page + 1);
		}
	};

	useEffect(() => {
		// console.log("In useEffect, page: ", page);
		// console.log("@@@ Data: ", data);
		if (data != null && data != undefined) {
			let results = [];
			let filteredResults = validObjectIDList.objectIDs.filter((x) =>
				data.objectIDs?.includes(x)
			);
			// for (let i = 0; i < data?.objectIDs?.length; i += PER_PAGE) {
			// 	const chunk = data?.objectIDs.slice(i, i + PER_PAGE);
			// 	results.push(chunk);
			// 	console.log("i");
			// }
			for (let i = 0; i < filteredResults.length; i += PER_PAGE) {
				const chunk = filteredResults.slice(i, i + PER_PAGE);
				results.push(chunk);
			}
			console.log("results:", results);
			// setArtworkList(results); // doesn't set?
			setArtworkList(results);
		}
	}, [data]);
	// console.log(
	// 	"artworkList should be set. In artwork page, artworkList: ",
	// 	artworkList
	// );
	// console.log("artworkList[page - 1]:", artworkList[page - 1]);
	// console.log("In artwork(), error: ", error);
	return (
		<>
			{error && <Error statusCode={404} />}
			<h4>Artwork page</h4>
			{artworkList?.length > 0 && (
				<Row className="gy-4">
					{/* {artworkList[page - 1].map((objID) => ( */}
					{artworkList[page - 1].map((objID) => (
						<Col lg={3} key={objID}>
							<ArtworkCard objectID={objID} />
						</Col>
					))}
				</Row>
			)}
			{artworkList[page - 1]?.length && (
				<Pagination>
					<Pagination.Prev onClick={previousPage} />
					<Pagination.Item>{page}</Pagination.Item>
					<Pagination.Next onClick={nextPage} />
				</Pagination>
			)}
		</>
	);
}
