import React from "react";
import { Confirmation } from "./sections";
import styles from "./page.module.css";
import { getGuest } from "../../_actions/guestAction";

const Home = () => {
	return (
		<main>
			<div className={styles.container}>
				<Confirmation />
			</div>
		</main>
	);
};

export default Home;
