import { Container, Nav, Navbar } from "react-bootstrap";

export default function MainNav() {
	return (
		<>
			<Navbar
				expand="lg"
				className="bg-body-tertiary fixed-top navbar-dark bg-dark"
				data-bs-theme="dark"
			>
				<Container>
					<Navbar.Brand>Frank Cheng</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Nav.Link href="/">Countries</Nav.Link>
							<Nav.Link href="/about">About</Nav.Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<br />
			<br />
		</>
	);
}
