/* eslint-disable @next/next/no-page-custom-font */
"use client";

import React from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import Link from "next/link";
import { FrameSection } from "@/app/components";

const Information = () => {
	return (
		<>
			<FrameSection>
				<div className={styles.container}>
					<h5 className={styles.joinUs}>Please join us celebrate</h5>
					<h1 className={styles.title}>Kairi&apos;s Baptism</h1>
					<Image
						src="/images/kairi_circle.png"
						alt="kairis image"
						width={180}
						height={180}
					/>
					<div className={styles.content}>
						<div className={styles.date}>
							<p>June 8, 2024</p>
							<p>Saturday</p>
						</div>
						<div className={styles.details}>
							<p>Mass starts</p>
							<p>8:00 AM</p>
							<p>
								at{" "}
								<Link
									href="https://maps.app.goo.gl/vJrDznSJg46WNXLA6"
									target="_blank">
									Diocesan Shrine and Parish of Nuestra Señora
									de Candelaria
								</Link>
							</p>
							<p>
								Note: Ninongs and Ninangs to attend Seminar at
								7:00 AM at
								<Link
									href="https://maps.app.goo.gl/GJXmTppvz63US6fVA"
									target="_blank">
									{" "}
									SK Hall
								</Link>{" "}
								behind the Parish
							</p>
							<p className={styles.venue}>
								Reception to follow at
								<Link
									href="https://maps.app.goo.gl/oE1d4mFptideFcdJ7"
									target="_blank">
									{" "}
									Farm Hills Garden Tagaytay
								</Link>
							</p>
						</div>
					</div>
				</div>
			</FrameSection>
		</>
	);
};

export default Information;
