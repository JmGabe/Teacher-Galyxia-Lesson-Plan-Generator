import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  ...props
}) => {
  const baseStyles = 'font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out';
  let variantStyles = '';
  let sizeStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-indigo-600 hover:bg-indigo-700 text-white';
      break;
    case 'secondary':
      variantStyles = 'bg-gray-200 hover:bg-gray-300 text-gray-800';
      break;
    case 'danger':
      variantStyles = 'bg-red-500 hover:bg-red-600 text-white';
      break;
    case 'outline':
      // Adjusted for dark theme
      variantStyles = 'bg-transparent border border-indigo-400 text-indigo-400 hover:bg-indigo-800 hover:text-white';
      break;
  }

  switch (size) {
    case 'sm':
      sizeStyles = 'text-sm py-1 px-3';
      break;
    case 'md':
      sizeStyles = 'text-base py-2 px-4';
      break;
    case 'lg':
      sizeStyles = 'text-lg py-3 px-6';
      break;
  }

  const loadingStyles = loading ? 'opacity-70 cursor-not-allowed' : '';

  return (
    <button
      className={`${baseStyles} ${variantStyles} ${sizeStyles} ${loadingStyles} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center">
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;