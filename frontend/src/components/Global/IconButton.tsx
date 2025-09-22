import { Button } from "../ui/button";

interface IconButtonProps {
  Icon: React.ElementType;
  children?: React.ReactNode;
  className?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const IconButton = ({
  Icon,
  className = "",
  children,
  ...props
}: IconButtonProps) => {
  const classes = `flex items-center justify-center ${className}`;

  return (
    <Button {...props} variant="outline" className={classes}>
      <Icon size={20} className="mr-2" />
      {children}
    </Button>
  );
};

export default IconButton;
