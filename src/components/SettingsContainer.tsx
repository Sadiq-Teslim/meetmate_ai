import type { ReactNode } from "react";
// import { cn } from "@/lib/utils";

interface SettingsContainerProps {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
}

export function SettingsContainer({
  children,
  className,
  title,
  description,
}: SettingsContainerProps) {
  return (
    <div
      className={`
        bg-slate-800/50 border border-slate-700 backdrop-blur-sm rounded-lg shadow-lg
        ${className}`}
    >
      {(title || description) && (
        <div className="p-6 pb-4">
          {title && (
            <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
          )}
          {description && <p className="text-slate-300">{description}</p>}
        </div>
      )}
      <div className="p-6 pt-2">{children}</div>
    </div>
  );
}
