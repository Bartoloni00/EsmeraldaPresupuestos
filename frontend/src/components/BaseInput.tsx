interface BaseInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  isOpcional?: boolean;
}

export default function BaseInput({
  label,
  name,
  value,
  onChange,
  placeholder = "",
  type = "text",
  isOpcional = false,
}: BaseInputProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {isOpcional && (
          <span className="text-sm text-gray-500">(Opcional)</span>
        )}
      </div>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        className={`mt-1 block w-full rounded-lg border border-gray-300 bg-gray-50 text-dark p-2.5 focus:ring-emerald-500 focus:border-emerald-500`}
        placeholder={placeholder}
      />
    </>
  );
}