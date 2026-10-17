import { iconRegistry, type IconName } from './icon-registry';

export interface UiIconProps {
  name: IconName;
  size?: number | string;
  className?: string;
}

export function UiIcon({ name, size = 20, className }: UiIconProps) {
  const Icon = iconRegistry[name];

  if (!Icon) {
    return null;
  }

  return (
    <Icon
      aria-hidden="true"
      className={className}
      height={size}
      width={size}
      size={size}
    />
  );
}
