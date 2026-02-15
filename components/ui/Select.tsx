import React from 'react';

interface SelectProps<T> extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: T; label: string }[];
  value: T;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  // Add 'id' explicitly as a prop for the Select component
  id: string;
  // Add required and disabled props to the interface
  required?: boolean;
  disabled?: boolean;
}

const Select = <T extends string | number | readonly string[]>(
  // Destructure 'id', 'required', and 'disabled' from props
  { label, options, value, onChange, id, required, disabled, ...props }: SelectProps<T>
): React.JSX.Element => {
  return (
    <div className="mb-4">
      {/* Use the destructured 'id' for htmlFor */}
      <label htmlFor={id} className="block text-gray-300 text-sm font-bold mb-2">
        {label}
      </label>
      <select
        // Use the destructured 'id' for the select element's id
        id={id}
        value={value}
        onChange={onChange}
        className="block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-gray-700 text-gray-100"
        required={required} // Pass the required prop
        disabled={disabled} // Pass the disabled prop
        {...props}
      >
        <option value="" disabled>
          Select {label.toLowerCase()}
        </option>
        {options.map((option) => (
          <option key={String(option.value)} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;