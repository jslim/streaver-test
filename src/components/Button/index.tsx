interface ButtonProps {
    text: string;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    variant?: "primary" | "secondary" | "danger";
    disabled?: boolean
  }
  
  export default function Button({
    text,
    onClick,
    className = "",
    type = "button",
    variant = "primary",
    disabled
  }: ButtonProps) {
    const baseStyles =
      "font-bold py-2 px-4 rounded-md shadow-xs text-sm focus:outline-none focus:ring-2 focus:ring-offset-2";
    const variantStyles = {
      primary: "bg-blue-500 hover:bg-blue-700 text-white",
      secondary:
        "bg-white text-gray-900 ring-1 ring-gray-300 hover:bg-gray-50 ring-inset",
      danger: "bg-red-500 hover:bg-red-700 text-white",
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${baseStyles} ${variantStyles[variant]} ${className}`}
        disabled={disabled}
      >
        {text}
      </button>
    );
  }
  