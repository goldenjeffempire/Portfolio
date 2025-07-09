
/**
 * Utility function to conditionally join class names
 * Similar to clsx/classnames but simpler
 */
export function cn(...classes) {
  return classes
    .filter(Boolean)
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export default cn;
