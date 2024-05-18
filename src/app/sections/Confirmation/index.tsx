"use client";

import React from "react";
import styles from "./styles.module.css";
import { GuestForm } from "./components";
import { FrameSection } from "@/app/components";

const Confirmation = () => {
	return (
		<FrameSection className={styles.section}>
			<h2 className={styles.title}>R.S.V.P</h2>
			<p className={styles.text}>Kindly please RSVP by May 27</p>
			<GuestForm />
			<p className={styles.clarificationText}>
				For any questions please contact Jana Roxas via Messenger
			</p>
		</FrameSection>
	);
};

export default Confirmation;
