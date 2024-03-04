import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface SelectProps
  extends React.DetailedHTMLProps<
    React.SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  label?: string | undefined;
  labelClassName?: string;
  icon?: ReactNode;
  errorMessage?: string | null | undefined;
  inputClassName?: string;
}

export const ThemedSelect: React.FC<SelectProps> = (props) => {
  const {
    label,
    className,
    labelClassName,
    icon,
    errorMessage,
    inputClassName,
    children,
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
        <select
          className={cn(
            "themed-select-control",
            inputClassName,
            icon ? "icon" : "",
            errorMessage && errorMessage !== "" ? "!border-red-600" : ""
          )}
          {...restProps}
        >
          {children}
        </select>

        {errorMessage && errorMessage !== "" && (
          <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};
