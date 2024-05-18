export type ResponseFuncs = {
	GET?: Function;
	POST?: Function;
	PUT?: Function;
	DELETE?: Function;
};

export type Guest = {
	_id?: number;
	firstName: string;
	lastName: string;
	isGoing: boolean;
	isAddedBy?: string;
};
