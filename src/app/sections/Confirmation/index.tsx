import React from "react";
import styles from "./styles.module.css";
import { GuestForm } from "./components";

const Confirmation = () => {
	return (
		<section className={styles.section}>
			<h3 className={styles.title}>Are you going to the event?</h3>
			<GuestForm />
		</section>
	);
};

export default Confirmation;
