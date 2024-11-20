import { searchHistoryAtom } from "@/store";
import { useRouter } from "next/router";

import { useAtom } from "jotai";

import styles from "@/styles/History.module.css";
import Button from "react-bootstrap/Button";
import ListGroup from "react-bootstrap/ListGroup";

export default function History() {
	const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

	let parsedHistory = [];
	const router = useRouter();

	searchHistory.forEach((h) => {
		let params = new URLSearchParams(h);
		let entries = params.entries();
		parsedHistory.push(Object.fromEntries(entries));
	});

	const historyClicked = (e, index) => {
		const query = "/artwork?" + searchHistory[index];
		router.push(query);
	};

	const removeHistoryClicked = (e, index) => {
		e.stopPropagation(); // stop the event from trigging other events
		setSearchHistory((current) => {
			let x = [...current];
			x.splice(index, 1);
			return x;
		});
	};

	console.log("In history component, parsedHistory:", parsedHistory);

	return (
		<>
			<h4>History Page</h4>
			<br />
			{parsedHistory.length == 0 && (
				<p>
					<b>Nothing here</b>, try searching for some artwork!
				</p>
			)}
			<ListGroup>
				{parsedHistory.length > 0 &&
					parsedHistory.map((historyItem, index) => (
						<ListGroup.Item
							onClick={(e) => historyClicked(e, index)}
							className={styles.historyListItem}
						>
							{Object.keys(historyItem).map((key) => (
								<>
									{key}: <strong>{historyItem[key]}</strong>&nbsp;
								</>
							))}
							<Button
								className="float-end"
								variant="danger"
								size="sm"
								onClick={(e) => removeHistoryClicked(e, index)}
							>
								&times;
							</Button>
						</ListGroup.Item>
					))}
			</ListGroup>
			{/* <h4>Test</h4>
			<ListGroup>
				{parsedHistory.map((link, i) => (
					<ListGroup.Item>
						{link.q}, {i}
					</ListGroup.Item>
				))}
			</ListGroup> */}
		</>
	);
}
