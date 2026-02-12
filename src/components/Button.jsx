// src/components/Button.jsx

// Aceita "children" (o texto dentro), "variant" (tipo do botão) e outras props (como onClick)
const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  
  // Estilos base que todo botão terá
  const baseStyles = "px-6 py-3 rounded-md font-bold transition-all duration-200 transform hover:-translate-y-1 active:translate-y-0";
  
  // Variações de estilo
  const variants = {
    primary: "bg-brand-primary text-brand-dark hover:shadow-[0_0_15px_rgba(102,252,241,0.5)]", // Botão "Comprar"
    secondary: "bg-brand-light text-brand-white border border-brand-secondary hover:bg-brand-secondary", // Botão "Ver Detalhes"
    outline: "border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-brand-dark" // Botão secundário transparente
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
