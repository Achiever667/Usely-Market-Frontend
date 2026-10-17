import type * as React from 'react';

export type IconSvgProps = React.SVGProps<SVGSVGElement> & {
  size?: number | string;
};

export type IconComponent =
  | React.ComponentType<IconSvgProps>
  | React.ForwardRefExoticComponent<
      Omit<IconSvgProps, 'ref'> & React.RefAttributes<SVGSVGElement>
    >;
