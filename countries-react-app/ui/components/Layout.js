import MainNav from "@/components/MainNav";
import { Container } from "react-bootstrap";

export default function Layout(props) {
	// const result = (
	// 	<>
	// 		<MainNav />

	// 		<br />
	// 		<Container>{props.children}</Container>

	// 		<br />
	// 	</>
	// );
	// console.log("result: ", result);
	return (
		<>
			<MainNav />

			<br />
			<Container>{props.children}</Container>

			<br />
		</>
	);
}
