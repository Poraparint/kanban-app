import { Button } from "@/components/ui/button";
import { DialogContentForm } from "@/components/shared";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
interface DialogButtonProps {
  icon?: React.ReactNode;
  title?: string;
  variant?: "default" | "outline" | "ghost" | "link";
  children: React.ReactNode;  
  dialogTitle?: string;
  dialogDescription?: string;
  open: boolean;
  setOpen: (open: boolean) => void;
  className?: string;
  formClassName?: string;
}

export const DialogButton = ({
  icon,
  title,
  variant = "default",
  children,
  dialogTitle,
  dialogDescription,
  open,
  setOpen,
  className,
  formClassName
}: DialogButtonProps) => {
  const button = (
    <Button onClick={() => setOpen(true)} className={ className } variant={variant}>
      {icon}
      {title}
    </Button>
  );

  return (
    <>
      {button}
      <DialogContentForm
        open={open}
        setOpen={setOpen}
        title={dialogTitle}
        description={dialogDescription}
        className={formClassName}
      >
        {children}
        <DialogFooter className="absolute bottom-6 left-5">
          <DialogClose asChild>
            <Button variant="outline" size="lg">
              ย้อนกลับ
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContentForm>
    </>
  );
};
