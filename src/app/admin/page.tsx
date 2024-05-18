"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { getGuest } from "../../../_actions/guestAction";
import { Guest } from "../../../utils/types";
import { FrameSection } from "../components";

const Admin = () => {
	const [guestLists, setGuestLists] = useState<Guest[]>([]);
	const [searchTerm, setSearchTerm] = useState("");

	const notGoingCount = guestLists.filter(({ isGoing }) => !isGoing).length;
	const goingCount = guestLists.filter(({ isGoing }) => isGoing).length;
	const filteredGuests = guestLists.filter(
		({ firstName, lastName }) =>
			firstName.includes(searchTerm.toLowerCase()) ||
			lastName.includes(searchTerm.toLowerCase())
	);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		setSearchTerm(value);
	};

	useEffect(() => {
		const getAllGuests = async () => {
			try {
				const response = await getGuest();

				setGuestLists(response);
			} catch (error) {
				console.error("error getting guests", error);
			}
		};

		getAllGuests();
	}, []);

	return (
		<FrameSection className={styles.section}>
			<div>
				<h1 className={styles.title}>Guest List</h1>
				<input
					className={styles.inputSearch}
					type="text"
					name="search"
					placeholder="Search..."
					onChange={handleInputChange}
					value={searchTerm}
				/>
				<div className={styles.headers}>
					<p className={styles.text}>Full Name</p>
					<p className={styles.text}>Is Going?</p>
				</div>
				<div className={styles.guestList}>
					{filteredGuests?.map(
						({ firstName, lastName, _id, isGoing }) => {
							const fullName = `${firstName} ${lastName}`;
							const isGoingText = isGoing ? "Yes" : "No";

							return (
								<div className={styles.guest} key={_id}>
									<p className={styles.name}>{fullName}</p>
									<p className={styles.isGoing}>
										{isGoingText}
									</p>
								</div>
							);
						}
					)}
				</div>
				<div className={styles.summary}>
					<p className={styles.total}>
						<span className={styles.totalText}>Total: </span>
						{guestLists.length}
					</p>
					<p className={styles.total}>
						<span className={styles.totalText}>Going: </span>
						{goingCount}
					</p>
					<p className={styles.total}>
						<span className={styles.totalText}>Not Going: </span>
						{notGoingCount}
					</p>
				</div>
			</div>
		</FrameSection>
	);
};

export default Admin;
