
import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

const buttonVariants = {
  primary: 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl border-0',
  secondary: 'bg-gradient-to-r from-secondary-100 to-secondary-200 hover:from-secondary-200 hover:to-secondary-300 text-secondary-900 dark:from-secondary-800 dark:to-secondary-700 dark:hover:from-secondary-700 dark:hover:to-secondary-600 dark:text-secondary-100 border border-secondary-300 dark:border-secondary-600',
  outline: 'border-2 border-primary-600 text-primary-600 hover:bg-primary-600 hover:text-white bg-transparent transition-all duration-300',
  ghost: 'text-secondary-700 dark:text-secondary-300 hover:bg-secondary-100 dark:hover:bg-secondary-800 hover:text-secondary-900 dark:hover:text-secondary-100 bg-transparent border-0',
  destructive: 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white shadow-lg hover:shadow-xl border-0',
  link: 'text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline bg-transparent border-0 p-0 h-auto'
};

const buttonSizes = {
  sm: 'h-8 px-3 text-sm rounded-md',
  md: 'h-10 px-4 py-2 text-base rounded-lg',
  lg: 'h-12 px-6 py-3 text-lg rounded-xl',
  xl: 'h-14 px-8 py-4 text-xl rounded-2xl'
};

const Button = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'md',
  children,
  disabled = false,
  loading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  href,
  target,
  rel,
  onClick,
  type = 'button',
  ...props
}, ref) => {
  const baseClasses = cn(
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none active:scale-95',
    buttonVariants[variant],
    buttonSizes[size],
    fullWidth && 'w-full',
    className
  );

  const buttonContent = (
    <>
      {loading && (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {!loading && leftIcon && leftIcon}
      <span className={loading ? 'opacity-0' : ''}>{children}</span>
      {!loading && rightIcon && rightIcon}
    </>
  );

  if (href) {
    return (
      <motion.a
        ref={ref}
        href={href}
        target={target}
        rel={rel}
        className={baseClasses}
        whileHover={{ scale: disabled ? 1 : 1.02 }}
        whileTap={{ scale: disabled ? 1 : 0.98 }}
        {...props}
      >
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      className={baseClasses}
      disabled={disabled || loading}
      onClick={onClick}
      whileHover={{ scale: disabled || loading ? 1 : 1.02 }}
      whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
      {...props}
    >
      {buttonContent}
    </motion.button>
  );
});

Button.displayName = 'Button';

export default Button;
