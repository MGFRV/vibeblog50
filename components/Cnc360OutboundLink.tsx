'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { trackCnc360Click } from '@/lib/cnc360';

type Cnc360OutboundLinkProps = ComponentProps<typeof Link>;

export default function Cnc360OutboundLink({ onClick, ...props }: Cnc360OutboundLinkProps) {
  return (
    <Link
      {...props}
      onClick={(event) => {
        trackCnc360Click();
        onClick?.(event);
      }}
    />
  );
}
