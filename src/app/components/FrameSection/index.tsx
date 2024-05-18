"use client";

import React, { HTMLAttributes, ReactNode } from "react";
import styles from "./styles.module.css";
import Image from "next/image";
import clsx from "clsx";

type FrameSectionProps = HTMLAttributes<HTMLDivElement> & {
	children: ReactNode;
	className?: string;
};

const FrameSection = ({ children, className, ...props }: FrameSectionProps) => {
	return (
		<section className={clsx(styles.section, className)} {...props}>
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
