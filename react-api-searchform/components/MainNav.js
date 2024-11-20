import { useRouter } from "next/router";
import { useState } from "react";

import { searchHistoryAtom } from "@/store";
import { useAtom } from "jotai";

import Link from "next/link";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function MainNav() {
	const [searchField, setSearchField] = useState("Search here");
	const [isExpanded, setExpanded] = useState(false);
	const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

	const router = useRouter();

	function submitForm(e) {
		e.preventDefault(); // prevent the browser from automatically submitting the form
		console.log(`form submitted - searchField: ${searchField}`);
		// href="/artwork?title=true&q={searchField}"

		const queryString = "title=true&q=" + searchField;
		router.push("/artwork?" + queryString);

		// push to searchHistory
		setSearchHistory((current) => [...current, queryString]);
		console.log("After pushing to searchHistory", searchHistory);

		setExpanded(false);
	}

	const toggleExpanded = () => {
		setExpanded(!isExpanded);
	};

	const collapseExpanded = () => {
		setExpanded(false);
	};

	return (
		<>
			<Navbar
				expand="lg"
				className="bg-body-tertiary fixed-top"
				expanded={isExpanded}
			>
				<Container>
					<Navbar.Brand href="#home">Frank Xunxiang Cheng</Navbar.Brand>
					<Navbar.Toggle
						aria-controls="basic-navbar-nav"
						onClick={toggleExpanded}
					/>
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="me-auto">
							<Link href="/" passHref legacyBehavior>
								<Nav.Link
									onClick={collapseExpanded}
									active={router.pathname === "/"}
								>
									Home
								</Nav.Link>
							</Link>
							<Link href="/search" passHref legacyBehavior>
								<Nav.Link
									onClick={collapseExpanded}
									active={router.pathname === "/search"}
								>
									Advanced Search
								</Nav.Link>
							</Link>
						</Nav>
						<Form className="d-flex" onSubmit={submitForm}>
							<Form.Control
								type="search"
								className="me-2"
								aria-label="Search"
								onChange={(e) => setSearchField(e.target.value)}
							/>
							<Button variant="outline-success" type="submit">
								Search
							</Button>
						</Form>
						&nbsp;
						<Nav>
							<NavDropdown title="User Name" id="basic-nav-dropdown">
								<Link href="/favourites" passHref legacyBehavior>
									<NavDropdown.Item active={router.pathname === "/favourites"}>
										Favourites
									</NavDropdown.Item>
								</Link>
								<Link href="/history" passHref legacyBehavior>
									<NavDropdown.Item active={router.pathname === "/history"}>
										History
									</NavDropdown.Item>
								</Link>
							</NavDropdown>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
			<br />
			<br />
		</>
	);
}
