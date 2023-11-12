"use client";
import { cva, VariantProps } from "class-variance-authority";
import { ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

const buttonStyles = cva(
  [
    "text-sm",
    "text-zinc-950",
    "rounded-lg",
    "transition-colors",
    "px-2",
    "py-2",
    "font-semibold",
  ],
  {
    variants: {
      variant: {
        default: ["border-[1px]"],
        completed: ["bg-green-200", "text-green-700"],
        inCompleted: ["bg-yellow-300", "text-yellow-600"],
        icon: ["rounded-full", "hover:bg-slate-200"],
      },
    },
  }
);
type ButtonProps = VariantProps<typeof buttonStyles> & ComponentProps<"button">;
const ButtonComponent = ({ variant, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      className={twMerge(buttonStyles({ variant }), className)}
    />
  );
};

export default ButtonComponent;
