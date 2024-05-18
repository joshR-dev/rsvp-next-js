"use client";

import { FrameSection } from "@/app/components";
import React from "react";
import styles from "./styles.module.css";

const DressCode = () => {
	return (
		<FrameSection className={styles.section}>
			<h2 className={styles.title}>Dress Code</h2>

			<div className={styles.content}>
				<p className={styles.text}>
					Dress code for Ninongs and Ninangs: White Semi-formal
				</p>
				<p className={styles.text}>
					For Family, Relatives and Friends: You may wear casual
					clothes, pastel colors will do but please avoid wearing dark
					colors. Thank you.
				</p>
			</div>
		</FrameSection>
	);
};

export default DressCode;
