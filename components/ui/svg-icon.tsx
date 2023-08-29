import Image from "next/image";
import { MouseEventHandler } from "react";
import { cn } from "@/lib/utils";

interface Props {
  onClick?: MouseEventHandler<HTMLImageElement>;
  name: string;
  size?: number;
  className?: string;
}

export default function SvgIcon(props: Props) {
  const { name, size = 24, className, ...rest } = props;
  return (
    <Image
      src={`/assets/images/${name}.svg`}
      alt={name}
      height={size}
      width={size}
      {...rest}
      className={cn("cursor-pointer", className)}
    />
  );
}
