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
    <div className="flex items-center gap-3 px-4 py-3 bg-white/10 backdrop-blur-lg rounded-xl w-full">
      {Icon && <Icon className="w-5 h-5 text-gray-200" />}

      <div className="flex flex-col flex-1 min-w-0">
        <label className="text-xs text-gray-300 mb-1">{label}</label>

        {type === "select" ? (
          <select className="bg-transparent text-white outline-none text-sm cursor-pointer w-full">
            {options.map((opt, i) => (
              <option key={i} value={opt} className="bg-gray-900">
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
          w-full max-w-5xl
          bg-white/10 backdrop-blur-xl rounded-2xl
          p-4
          
          flex flex-col gap-4
          lg:flex-row lg:flex-wrap lg:items-center 
        "
      >
        {/* Inputs */}
        <div className="flex-1 min-w-[200px] ">
          <InputField label="Check in" type="date" icon={Calendar} />
        </div>

        <div className="flex-1 min-w-[200px]">
          <InputField label="Checkout" type="date" icon={Calendar} />
        </div>

        <div className="flex-1 min-w-[200px]">
          <InputField
            label="Guests"
            type="select"
            icon={Users}
            options={["1 Guest", "2 Guests", "3 Guests", "4 Guests"]}
          />
        </div>

        {/* Button */}
        <button
          className="
            bg-green-400 hover:bg-green-500 text-gray-900 font-semibold
            px-8 py-3 rounded-xl transition
            w-full lg:w-auto
          "
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default BookingForm;
