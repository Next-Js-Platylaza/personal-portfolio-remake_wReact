"use client";
import { InputAttributes } from "@/app/lib/definitions";
import { JSX, useEffect, useRef, useState } from "react";
import { v1 as generateV1Uuid } from "uuid";

type ComponentStyles = {
	rootDiv?: string;
	fieldset?: string;
	legend?: string;
	input?: string;
	addButton?: string;
	removeButton?: string;
};
export default function useArrayInput({
	label,
	key,
	defaultValues,
	styles,
	inputMinMaxLength = [1, 5],
}: {
	label: string;
	key: string;
	defaultValues: string[];
	styles?: ComponentStyles;
	inputMinMaxLength: [number, number];
}) {
	const firstID: string = key + "-first";
	const [items, setItems] = useState([NewItem(firstID)]);
	const [itemIDs, setItemIDs] = useState([firstID]);
	const [itemIDToRemove, setItemIDToRemove] = useState("None");

	useEffect(() => {
		if (itemIDToRemove != "None") {
			onRemoveItem(itemIDToRemove);
		}
	}, [itemIDToRemove]);

	function getCapitalizedLabel() {
		return label[0].toUpperCase() + label.substring(1).toLowerCase();
	}

	function NewItem(id: string, defaultValue?: string) {
		return (
			<ArrayInput
				key={id}
				attributes={{
					id: id,
					label: label,
					type: "text",
					defaultValue: defaultValue,
					placeholder: `Enter ${label}`,
					minLength: inputMinMaxLength[0],
					maxLength: inputMinMaxLength[1],
					required: true,
					removable: id != firstID,
					inputStyles: styles?.input,
					removeButtonStyles: styles?.removeButton,
				}}
				removeComponent={() => {
					setItemIDToRemove(id);
				}}
			/>
		);
	}

	function onAddItem() {
		const uuid = generateV1Uuid();
		setItems([...items, NewItem(uuid)]);
		setItemIDs([...itemIDs, uuid]);
	}
	function onRemoveItem(uuid: string) {
		const index = itemIDs.indexOf(uuid);
		setItems((items) => [
			...items.slice(0, index),
			...items.slice(index + 1),
		]);
		setItemIDs((itemIDs) => [
			...itemIDs.slice(0, index),
			...itemIDs.slice(index + 1),
		]);
	}

	function refillInputs() {
		if (!defaultValues || defaultValues.length <= 0) return;

		let newItems: JSX.Element[] = [];
		let newItemIDs: string[] = [];

		let isFirst: boolean = true;
		defaultValues?.forEach((value) => {
			const id: string = isFirst ? firstID : generateV1Uuid();
			newItems = [...newItems, NewItem(id, value)];
			newItemIDs = [...newItemIDs, id];
			isFirst = false;
		});

		setItems(newItems);
		setItemIDs(newItemIDs);
	}

	return [
		<div className={styles?.rootDiv} key={key}>
			<fieldset className={styles?.fieldset}>
				<legend className={styles?.legend}>
					{`${getCapitalizedLabel()}s`}
				</legend>
				{items.map((inputArray) => (
					<div key={inputArray.props.attributes.id}>{inputArray}</div>
				))}
				<button
					className={styles?.addButton}
					type="button"
					onClick={onAddItem}
				>
					Add {getCapitalizedLabel()}
				</button>
			</fieldset>
		</div>,
		refillInputs,
	] as [JSX.Element, () => void];
}

function ArrayInput({
	attributes,
	removeComponent,
}: {
	attributes: InputAttributes;
	removeComponent: (name: string) => void;
}) {
	const inputRef = useRef<HTMLInputElement>(null);

	useEffect(()=>{
		if (attributes.removable && (inputRef.current?.value == undefined || inputRef.current?.value.length < 1)) inputRef.current?.focus();
	}, [])

	return (
		<div className="flex gap-7">
			<label
				htmlFor={attributes.id}
				aria-label={`Input ${attributes.label}`}
			/>
			<input
				ref={inputRef}
				className={attributes?.inputStyles}
				id={`${attributes.label}${attributes.id}`}
				name={`${attributes.label}s`}
				type={attributes.type}
				defaultValue={attributes.defaultValue}
				placeholder={attributes?.placeholder}
				minLength={attributes?.minLength}
				maxLength={attributes?.maxLength}
				required={attributes?.required}
			/>
			{attributes.removable && (
				<button
					className={attributes?.removeButtonStyles}
					type="button"
					onClick={() => {
						removeComponent(attributes.id);
					}}
				>
					Remove
				</button>
			)}
		</div>
	);
}
