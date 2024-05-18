import React from "react";
import { Confirmation, DressCode, Information } from "./sections";
import styles from "./page.module.css";

const Home = () => {
	return (
		<>
			<main>
				<div className={styles.container}>
					<Information />
					<Confirmation />
					<DressCode />
				</div>
			</main>
		</>
	);
};

export default Home;
