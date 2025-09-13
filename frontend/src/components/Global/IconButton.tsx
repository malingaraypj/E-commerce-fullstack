import { Button } from "../ui/button";

interface IconButtonProps {
  Icon: React.ElementType;
  children?: React.ReactNode;
  className?: string;
}

const IconButton = ({ Icon, className = "", children }: IconButtonProps) => {
  let classes =
    "cursor-pointer bg-black text-white flex items-center justify-center";
  if (className) {
    classes = className;
  }
  return (
    <Button variant="outline" className={classes}>
      <Icon size={20} className="mr-2" />
      {children}
    </Button>
  );
};

export default IconButton;
