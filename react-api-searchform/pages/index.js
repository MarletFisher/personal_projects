/*********************************************************************************
 *  WEB422 – Assignment 5
 *
 *  I declare that this assignment is my own work in accordance with Seneca's
 *  Academic Integrity Policy:
 *
 *  https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
 *
 *  Name: Frank Xunxiang Cheng Student ID: 051702033 Date: November 19th, 2024
 *
 ********************************************************************************/

import Image from "react-bootstrap/Image";

export default function Home() {
	return (
		<>
			<Image
				src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
				fluid
				rounded
			/>
			<br />
			<br />
			<p>
				The Metropolitan Museum of Art, colloquially referred to as the Met, is
				an encyclopedic art museum in New York City. By floor area, it is the
				fourth-largest museum in the world and the largest art museum in the
				Americas. With 5.36 million visitors in 2023, it is the most-visited
				museum in the United States and the fifth-most visited art museum in the
				world. &nbsp;
				<a
					href="https://en.wikipedia.org/wiki/Metropolitan_Museum_of_Art"
					target="_blank"
					rel="noreferrer"
				>
					…read more
				</a>
			</p>
		</>
	);
}
