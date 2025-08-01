import { Button } from "@/components/ui/button";

interface SubmitButtonProps {
  label?: string;
  icon?: React.ReactNode;
  isPending?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  tooltip?: string;
}

export const SubmitButton = ({
  label,
  icon,
  isPending = false,
  onClick,
  disabled = false,
}: SubmitButtonProps) => {
  return (
    <Button
      type="submit"
      onClick={onClick}
      disabled={disabled || isPending}
      className="px-9"
    >
      {isPending ? "Processing..." : label ? label : icon}
    </Button>
  );
};
