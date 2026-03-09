export type User = {
	id: string;
	name: string;
	email: string;
	password: string;
};

export type Article = {
	id: string;
	title: string;
	text: string;
};
export type ArticleComment = {
	id: string;
	article_id: string;
	user_id: string;
	text: string;
};

export type LinkStructure = {
	name?: string;
	href: string;
};

export type ProjectStructure = {
	id: number;
	linkAddress: string;
	title: string;
	description: string;
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
