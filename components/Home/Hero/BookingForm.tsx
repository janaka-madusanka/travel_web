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
    <div className="flex items-center gap-3 px-4 py-3 bg-white/5 rounded-lg w-full sm:flex-1 min-w-0">
      {Icon && <Icon className="w-5 h-5 text-gray-400 flex-shrink-0" />}
      <div className="flex flex-col flex-1 min-w-0 ">
        <label className="text-xs text-gray-400 mb-1">{label}</label>

        {type === "select" ? (
          <select className="bg-transparent text-white outline-none text-sm cursor-pointer w-full">
            {options.map((opt, i) => (
              <option key={i} value={opt} className="bg-gray-800">
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            className="bg-transparent text-white outline-none text-sm w-full"
          />
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
    bg-white/10 backdrop-blur-lg rounded-2xl
    p-3 sm:p-4 md:p-6 lg:p-8
    flex flex-col 
    gap-2
    xl:flex-row xl:items-center xl:gap-6
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