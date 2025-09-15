import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const UserAvatar: React.FC<{ img?: string; label?: string; size?: number }> = ({
  img,
  label,
  size = 40, // default 40px
}) => {
  return (
    <div className="flex items-center gap-2">
      <Avatar style={{ width: size, height: size }}>
        <AvatarImage src={img ? img : "https://github.com/shadcn.png"} />
        {label && <AvatarFallback>{label.charAt(0)}</AvatarFallback>}
      </Avatar>
      <span className="font-medium">{label}</span>
    </div>
  );
};

export default UserAvatar;
