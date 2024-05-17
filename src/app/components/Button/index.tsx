import React, { ButtonHTMLAttributes, ReactNode } from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
	className?: string;
	children: ReactNode;
};

const Bounty = ({ children, className, ...props }: ButtonProps) => {
	return (
		<button className={clsx(className, styles.btn)} {...props}>
			{children}
		</button>
	);
};

export default Bounty;
