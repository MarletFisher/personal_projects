import { Col, Container, Row } from "react-bootstrap";

export default function CountryDetails(props) {
	return (
		<>
			<Container>
				<Row>
					<Col lg>
						<img
							onError={(event) => {
								event.target.onError = null;
								event.target.src = props.country.coatOfArms;
							}}
							className="img-fluid w-100"
							src={props.country.coatOfArms}
							alt="A country run by a bastard"
						/>
					</Col>
					<Col lg>
						<h2>{props.country.name}</h2>
						<br />
						<p>
							<b>Native Name: </b>
							{props.country.nativeName}
						</p>
						<p>
							<b>𝛼2/𝛼3 Code: </b>
							{props.country.a2code}/{props.country.a3code}
						</p>
						<p>
							<b>Capital: </b>
							{props.country.capital}
						</p>
						<p>
							<b>Languages: </b>
							{props.country.languages}
						</p>
						<p>
							<b>Population: </b>
							{props.country.population}
						</p>
						<p>
							<b>Area: </b>
							{props.country.area} sq mi
						</p>
						<p>
							<b>Latitude/Longitude: </b>
							{props.country.latlng}
						</p>
						<p>
							<b>Top-Level Domain: </b>
						</p>
						<ul>
							<li> {props.country.tld[0]}</li>
						</ul>
						<p>
							<b>Currencies: </b>
						</p>
						<ul>
							{" "}
							<li>
								{props.country.currencies[0].name} (
								{props.country.currencies[0].symbol})
							</li>
						</ul>
						<p>
							<b>Continents: </b>
							{props.country.region}
						</p>
						<p>
							<b>Region/Subregion: </b>
							{props.country.subregion}
						</p>
						<p>
							<b>Map on Google: </b>
							<a href={props.country.googleMaps}> {props.country.googleMaps}</a>
						</p>
						<br />
					</Col>
				</Row>
			</Container>
		</>
	);
}
