"use client";

type InputFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
};

export default function InputField({
  label,
  value,
  onChange,
  placeholder,
}: InputFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-[#d7e5df] bg-[#f8fbfa] px-4 py-3 text-sm outline-none transition focus:border-[#0d5c46]"
      />
    </div>
  );
}