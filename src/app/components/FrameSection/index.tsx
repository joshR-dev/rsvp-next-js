"use client";

import React, { ReactNode } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import clsx from "clsx";

type FrameSectionProps = {
	children: ReactNode;
	className?: string;
};

const FrameSection = ({ children, className }: FrameSectionProps) => {
	return (
		<section className={clsx(styles.section, className)}>
			<Image
				className={styles.background}
				src="/images/rectangle.png"
				alt="background"
				width={180}
				height={180}
			/>
			{children}
			<div className={styles.flowerBGWrapper}>
				<Image
					className={styles.flowerBg}
					src="/images/flower.png"
					alt="flower"
					width={100}
					height={100}
				/>
			</div>
		</section>
	);
};

export default FrameSection;
