export type User = {
	id: string;
	name: string;
	email: string;
	password: string;
};
export type Recipe = {
	id: string;
	title: string;
	image: string;
	ingredients: string[];
	steps: string[];
	user_id: string;
	date: Date;
	edit_date: Date;
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
