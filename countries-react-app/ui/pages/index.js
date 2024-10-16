/*********************************************************************************
 *  WEB422 – Assignment 3
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: Frank Cheng Student ID: 051702033 Date: Oct 15th, 2024
 *
 ********************************************************************************/

import CountryDetails from "@/components/CountryDetails";
import PageHeader from "@/components/PageHeader";
import { useEffect, useState } from "react";
import { Accordion, Pagination } from "react-bootstrap";
import useSWR from "swr";

export default function Home() {
	const [page, setPage] = useState(0);
	const [pageData, setPageData] = useState([]);

	const { data, error } = useSWR(
		`https://xcheng6-web422-8ecavtnqx-xunxiang-chengs-projects.vercel.app/api/countries?page=${
			page + 1
		}&perPage=10`
	);

	useEffect(() => {
		if (data) {
			console.log("In useEffect", data);
			setPageData(data);
		}
	}, [data]);

	const previous = () => {
		if (page > 0) {
			setPage(page - 1);
		}
	};

	const next = () => {
		setPage(page + 1);
	};

	return (
		<>
			<p>Countries</p>
			<PageHeader text="Browse Countries : Sorted by Number of Ratings" />
			<Accordion defaultActiveKey="0">
				{pageData?.map((country) => (
					<Accordion.Item eventKey={country._id} key={country._id}>
						<Accordion.Header>
							<b>{country.name}&nbsp;</b>- {country.region}
						</Accordion.Header>
						<Accordion.Body>
							<CountryDetails country={country} />
						</Accordion.Body>
					</Accordion.Item>
				))}
			</Accordion>
			<Pagination>
				<Pagination.Prev onClick={previous} />
				<Pagination.Item>{page + 1}</Pagination.Item>
				<Pagination.Next onClick={next} />
			</Pagination>
		</>
	);
}
