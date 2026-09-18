import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

function Input({
  label,
  icon: Icon,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const inputType =
    type === "password"
      ? showPassword
        ? "text"
        : "password"
      : type;

  return (
    <div className="space-y-2">

      <label className="text-sm font-medium text-slate-700">
        {label}
      </label>

      <div className="relative">

        <Icon
          size={20}
          className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          text-slate-400
          "
        />

        <input
          type={inputType}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="
                    w-full
                    h-14
                    rounded-xl
                    border
                    border-slate-300
                    bg-slate-50
                    pl-12
                    pr-12
                    text-slate-800
                    placeholder:text-slate-400
                    transition-all
                    duration-300
                    outline-none
                    focus:border-blue-500
                    focus:ring-4
                    focus:ring-blue-100
                    "
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="
            absolute
            right-4
            top-1/2
            -translate-y-1/2
            text-slate-400
            "
          >
            {showPassword ? (
              <EyeOff size={20} />
            ) : (
              <Eye size={20} />
            )}
          </button>
        )}
      </div>

    </div>
  );
}

export default Input;