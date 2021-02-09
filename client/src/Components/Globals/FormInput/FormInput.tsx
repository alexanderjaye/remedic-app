import React from "react";

export interface FormInputType {
  name: string;
  value: string;
}

interface Props {
  type: string;
  placeholder: string;
  id: string;
  name: string;
  autoComplete?: string;
  updateInput: (name: string, value: string) => void;
  onSubmit: () => void;
}

function FormInput(props: Props) {
  const { type, placeholder, id, name, updateInput, autoComplete } = props;

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault();
    updateInput(name, e.currentTarget.value);
  };

  return (
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      name={name}
      onChange={handleInputChange}
      autoComplete={autoComplete ? autoComplete : "on"}
      className="px-4 rounded-md shadow-sm py-2 ring-2 focus:ring-blue-dark w-full cursor-text"
    />
  );
}

export default FormInput;
