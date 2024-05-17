"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { HeartCanvas } from "@/app/components";
import { addGuests } from "../../../../_actions/guestAction";

const HEART_COLOR = "blue";
const HEART_COLOR_DEFAULT = "white";
const MAX_GUESTS = 5;

type Guest = {
	firstName: string;
	lastName: string;
	isGoing?: boolean;
};

const Confirmation = () => {
	const [errorIndexes, setErrorIndexes] = useState<number[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isGoing, setIsGoing] = useState(false);
	const [guests, setGuests] = useState<Guest[]>([
		{ firstName: "", lastName: "" },
	]);

	const handleInputChange = (
		index: number,
		e: ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = e.target;

		const newGuests = [...guests];

		// @ts-ignore
		newGuests[index][name] = value;
		setGuests(newGuests);
	};

	const addGuest = () => {
		setGuests([...guests, { firstName: "", lastName: "" }]);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const isInvalid = guests.some((guest) => {
			const { firstName, lastName } = guest;

			if (!firstName || !lastName) return true;
		});

		if (isInvalid) return;

		setErrorIndexes([]);

		try {
			setIsLoading(true);
			const payload = guests.map((guest) => {
				return {
					...guest,
					isGoing,
				};
			});

			await addGuests(payload);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		guests.forEach((guest, index) => {
			const { firstName, lastName } = guest;
			const hasError = errorIndexes.includes(index);

			if ((!firstName || !lastName) && !hasError) {
				setErrorIndexes([...errorIndexes, index]);
			}

			if (firstName && lastName && hasError) {
				setErrorIndexes(
					errorIndexes.filter((number) => number !== index)
				);
			}
		});
	}, [errorIndexes, guests]);

	useEffect(() => console.log("error indexss", errorIndexes), [errorIndexes]);

	return (
		<section className={styles.section}>
			{/* if !isGoing render a p text that has a thank you message and setisnot going */}
			{/* for the api it should have post request to /api/submit and check if the current name is already included throw an error for the form */}
			{/* form should have a dropd down of how many gusest are coming and a text input for the names */}
			<h3 className={styles.title}>Are you going to the event?</h3>
			<form className={styles.form} onSubmit={handleSubmit}>
				<div className={styles.actionsContainer}>
					<div className={styles.btnWrapper}>
						<button
							type="button"
							className={styles.actionBtn}
							onClick={() => setIsGoing(true)}>
							<HeartCanvas
								fillColor={
									isGoing ? HEART_COLOR : HEART_COLOR_DEFAULT
								}
							/>
						</button>
						<p className={styles.btnText}>Yes</p>
					</div>
					<div className={styles.btnWrapper}>
						<button
							type="button"
							className={styles.actionBtn}
							onClick={() => setIsGoing(false)}>
							<HeartCanvas
								fillColor={
									!isGoing ? HEART_COLOR : HEART_COLOR_DEFAULT
								}
							/>
						</button>
						<p className={styles.btnText}>No</p>
					</div>
				</div>
				<h4>Guests:</h4>
				<div className={styles.inputs}>
					{guests?.map(({ firstName, lastName }, index) => {
						return (
							<div key={index}>
								<div className={styles.inputGroup}>
									<div className={styles.input}>
										<input
											type="text"
											name="firstName"
											value={firstName}
											placeholder="First Name"
											onChange={(e) =>
												handleInputChange(index, e)
											}
										/>
									</div>
									<div className={styles.input}>
										<input
											type="text"
											name="lastName"
											value={lastName}
											placeholder="Last Name"
											onChange={(e) =>
												handleInputChange(index, e)
											}
										/>
									</div>
								</div>
								{errorIndexes.includes(index) ? (
									<p className={styles.errorMessage}>
										First name and last name are required.
									</p>
								) : null}
							</div>
						);
					})}
				</div>
				<button
					className={styles.btn}
					type="button"
					disabled={guests.length === MAX_GUESTS}
					onClick={addGuest}>
					add more guests
				</button>
				<button
					className={styles.submitBtn}
					type="submit"
					disabled={isLoading}>
					{isLoading ? "...loading" : "submit"}
				</button>
			</form>
		</section>
	);
};

export default Confirmation;
