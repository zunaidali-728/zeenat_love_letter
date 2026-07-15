import { motion, HTMLMotionProps } from "framer-motion";

interface ActWrapperProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export const ActWrapper = ({ children, className = "", ...rest }: ActWrapperProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 1.5 }}
    className={`absolute inset-0 w-full h-full overflow-y-auto overflow-x-hidden flex flex-col items-center justify-start sm:justify-center py-8 px-4 ${className}`}
    {...rest}
  >
    {children}
  </motion.div>
);
