export type User = {
	id: string;
	name: string;
	email: string;
	password: string;
};

export type LinkStructure = {
	name?: string;
	href: string;
};

export type InputAttributes = {
	id: string;
	label: string;
	type: string;
	defaultValue?: string;
	placeholder?: string;
	minLength?: number;
	maxLength?: number;
	required?: boolean;
	removable?: boolean;
	inputDivStyles?: string;
	inputStyles?: string;
	removeButtonStyles?: string;
};
