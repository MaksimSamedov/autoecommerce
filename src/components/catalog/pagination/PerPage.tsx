import React from "react";

interface PerPageProps {
    title: string | undefined,
    values: number[],
    defaultValue: number,
    selected: number,
    onChange: (val: number) => void,
}

export function PerPage(props: PerPageProps) {
    const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        props.onChange(Number(e.target.value))
    }
    return (
        <label>
            {props.title ? props.title : "Per page"}:
            <select
                className="py-1 ml-5"
                onChange={onChange}
                value={props.selected}
            >
                {props.values.map(val => (
                    <option value={val} key={val}>{val}</option>
                ))}
            </select>
        </label>
    );
}