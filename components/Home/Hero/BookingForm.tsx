import React from "react";
import { Calendar, Users } from "lucide-react";

interface InputFieldProps {
  label: string;
  type?: "text" | "date" | "select";
  options?: string[];
  icon?: React.ElementType;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  type = "text",
  options = [],
  icon: Icon,
}) => {
  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg w-full sm:flex-1">
      {Icon && <Icon className="w-5 h-5 text-gray-400" />}
      <div className="flex flex-col flex-1">
        <label className="text-xs text-gray-400 mb-1">{label}</label>

        {type === "select" ? (
          <select className="bg-transparent text-white outline-none text-sm cursor-pointer">
            {options.map((opt, i) => (
              <option key={i} value={opt} className="bg-gray-800">
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input type={type} className="bg-transparent text-white outline-none text-sm" />
        )}
      </div>
    </div>
  );
};

const BookingForm: React.FC = () => {
  return (
    <div className="flex items-center justify-center px-4 w-full">
      <div
        className="
          w-full max-w-4xl 
          bg-white/10 backdrop-blur-lg rounded-2xl p-4
          flex flex-col gap-3
          sm:flex-row sm:flex-wrap sm:items-stretch
        "
      >
        <InputField label="Check in" type="date" icon={Calendar} />
        <InputField label="Checkout" type="date" icon={Calendar} />
        <InputField
          label="Guests"
          type="select"
          options={["1 Guest", "2 Guests", "3 Guests", "4 Guests"]}
          icon={Users}
        />

        {/* Button responsive behavior */}
        <button
          className="
            bg-green-400 hover:bg-green-500 text-gray-900 font-semibold
            px-8 py-3 rounded-lg transition
            whitespace-nowrap 
            w-full sm:w-auto
          "
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
