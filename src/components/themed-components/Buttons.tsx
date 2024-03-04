import { cn } from "@nextui-org/react";
import { ReactNode } from "react";

interface ThemedButtonProps
  extends React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  icon?: ReactNode;
  size: "sm" | "md" | "lg" | undefined;
  variant: "primary" | "outlined" | "link" | "light" | undefined;
}

const ThemedButton: React.FC<ThemedButtonProps> = (props) => {
  const {
    type,
    className,
    children,
    icon,
    size,
    variant,
    disabled,
    ...restProps
  } = props;
  return (
    <button
      type={type}
      className={cn(
        "themed-button",
        className,
        size,
        variant,
        disabled ? "themed-button-disabled" : ""
      )}
      {...restProps}
      disabled={disabled}
    >
      {icon}
      {children}
    </button>
  );
};

export default ThemedButton;
