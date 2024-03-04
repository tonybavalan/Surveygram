import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string | undefined;
  labelClassName?: string;
  icon?: ReactNode;
  errorMessage?: string | null | undefined;
  inputClassName?: string;
}

export const TextField: React.FC<InputProps> = (props) => {
  const {
    type,
    label,
    className,
    labelClassName,
    icon,
    errorMessage,
    inputClassName,
    ...restProps
  } = props;
  return (
    <div className={cn("themed-form-group", className)}>
      {label && (
        <label className={cn("themed-input-label", labelClassName)}>
          {label}
        </label>
      )}
      <div className="themed-form-control">
        <div className="theme-control-icon">{icon}</div>
        <input
          type={type}
          {...restProps}
          className={cn(
            "themed-input-control",
            inputClassName,
            icon ? "icon" : "",
            errorMessage && errorMessage !== "" ? "!border-red-600" : ""
          )}
        />
        {errorMessage && errorMessage !== "" && (
          <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export const CheckBox: React.FC<InputProps> = (props) => {
  const { label, className, labelClassName, ...restProps } = props;
  return (
    <label className="themed-checkbox-group mb-5">
      {label}
      <input
        type={"checkbox"}
        {...restProps}
        className={cn("themed-checkbox-control", className)}
      />
      <span className="checkmark"></span>
    </label>
  );
};
