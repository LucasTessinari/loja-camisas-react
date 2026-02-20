// src/components/Button.jsx

const Button = ({ children, variant = "primary", className = "", ...props }) => {
  // Estilos base que todo botão terá
  const baseStyles =
    "px-6 py-3 rounded-md font-bold transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0 text-[#FFFFFF]";

  // Variações de estilo
  const variants = {
    primary:
      "bg-brand-primary hover:shadow-[0_0_15px_rgba(102,252,241,0.5)]",
    secondary:
      "bg-brand-light border border-brand-secondary hover:bg-brand-secondary",
    outline:
      "border-2 border-brand-primary hover:bg-brand-primary",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
