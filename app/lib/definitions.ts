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
	url_slug: string;
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

export type Project = {
	id: string;
	title: string;
	link: string;
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

export type WeatherData = {
	temp: string;
	word: string;
};

export type LocationCoords = {
	latitude: number | null;
	longitude: number | null;
};

export type LocationState = {
	loading: boolean;
	coords: LocationCoords | null;
	error: string | null;
};
