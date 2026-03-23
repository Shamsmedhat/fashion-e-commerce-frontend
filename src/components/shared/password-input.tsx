import { forwardRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

// TODO: create this in shadcn input
export const PasswordInput = forwardRef<HTMLInputElement, React.ComponentProps<typeof Input>>(
  (props, ref) => {
    // State
    const [showPassword, setShowPassword] = useState(false);

    return (
      <div className="relative">
        {/* Input */}
        <Input type={showPassword ? "text" : "password"} {...props} ref={ref} />

        {/* Toggle visibility */}
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute right-0 rtl:right-auto rtl:left-0 top-0 h-full px-3"
          onClick={() => setShowPassword(!showPassword)}
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Eye className="h-4 w-4" aria-hidden="true" />
          )}
          <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
        </Button>
      </div>
    );
  },
);

PasswordInput.displayName = "PasswordInput";
