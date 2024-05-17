"use client";

import React from "react";
import styles from "./styles.module.css";
import { HeartCanvas } from "@/app/components";

const HEART_COLOR = "blue";
const HEART_COLOR_DEFAULT = "white";

export type HeartButtonsProps = {
	isGoing: boolean;
	setIsGoing: React.Dispatch<React.SetStateAction<boolean>>;
};

const HeartButtons = ({ isGoing, setIsGoing }: HeartButtonsProps) => {
	return (
		<div className={styles.actionsContainer}>
			<div className={styles.btnWrapper}>
				<button
					type="button"
					className={styles.actionBtn}
					onClick={() => setIsGoing(true)}>
					<HeartCanvas
						fillColor={isGoing ? HEART_COLOR : HEART_COLOR_DEFAULT}
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
						fillColor={!isGoing ? HEART_COLOR : HEART_COLOR_DEFAULT}
					/>
				</button>
				<p className={styles.btnText}>No</p>
			</div>
		</div>
	);
};

export default HeartButtons;
