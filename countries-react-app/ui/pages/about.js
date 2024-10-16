// import {Link} from 'next/link';
import CountryDetails from "@/components/CountryDetails";
import PageHeader from "@/components/PageHeader";
import Link from "next/link";
import Card from "react-bootstrap/Card";

export async function getStaticProps() {
	const res = await fetch(
		"https://xcheng6-web422-8ecavtnqx-xunxiang-chengs-projects.vercel.app/api/countries/66df4c0535b935aff579b986"
	);
	const data = await res.json();
	return { props: { country: data } };
}
//http://localhost:8080/api/countries/66df4c0535b935aff579b986
//https://xcheng6-web422-8ecavtnqx-xunxiang-chengs-projects.vercel.app/api/countries/66df4c0535b935aff579b986

export default function About(props) {
	console.log("props: ", props);
	return (
		<>
			<Card>
				<PageHeader text="About the Developer - Frank Cheng" />
			</Card>
			<Card>
				<p>
					<Link href="/country/66df4c0535b935aff579b986">Canada</Link>
					&nbsp;is a decent place I guess.
				</p>
				<CountryDetails country={props.country} />

				{/* <p>{props.country?.name}</p> */}
			</Card>
		</>
	);
}
