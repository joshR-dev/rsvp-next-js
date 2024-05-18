"use client";

import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import styles from "./styles.module.css";
import { addGuests } from "../../../../../../_actions/guestAction";
import { Button, HeartCanvas } from "@/app/components";
import HeartButtons from "../HeartButtons";

const MAX_GUESTS = 5;

type Guest = {
	firstName: string;
	lastName: string;
	isGoing?: boolean;
};

const GuestForm = () => {
	const [errorIndexes, setErrorIndexes] = useState<number[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isGoing, setIsGoing] = useState(false);
	const [guests, setGuests] = useState<Guest[]>([
		{ firstName: "", lastName: "" },
	]);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [submitMessage, setSubmitMessage] = useState(null);

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

	const removeGuest = (currentIndex: number) => {
		const newGuests = guests.filter((_, index) => currentIndex !== index);

		setGuests(newGuests);
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
			const payload = guests.map((guest: Guest) => {
				return {
					firstName: guest.firstName.toLowerCase(),
					lastName: guest.lastName.toLowerCase(),
					isGoing,
				};
			});

			const response = await addGuests(payload);

			setSubmitMessage(response.msg);
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
			setIsSubmitted(true);
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

	if (isSubmitted) {
		return <p className={styles.submittedText}>{submitMessage}</p>;
	}

	return (
		<>
			<h3 className={styles.subtitle}>Are you going to the event?</h3>
			<form className={styles.form} onSubmit={handleSubmit}>
				<HeartButtons isGoing={isGoing} setIsGoing={setIsGoing} />
				<h4>Guests:</h4>
				<div className={styles.inputs}>
					{guests?.map(({ firstName, lastName }, index) => {
						return (
							<div key={index}>
								<div className={styles.inputGroup}>
									{index > 0 ? (
										<button
											type="button"
											onClick={() => removeGuest(index)}
											className={styles.remove}>
											x
										</button>
									) : null}
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
				<Button
					className={styles.btn}
					type="button"
					disabled={guests.length === MAX_GUESTS}
					onClick={addGuest}>
					add more guests
				</Button>
				<Button
					className={styles.submitBtn}
					type="submit"
					disabled={isLoading}>
					{isLoading ? "...loading" : "submit"}
				</Button>
			</form>
		</>
	);
};

export default GuestForm;
