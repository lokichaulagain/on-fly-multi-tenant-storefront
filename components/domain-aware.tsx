'use client';

import { useDomain } from '@/contexts/DomainContext';
import { ReactNode } from 'react';

interface DomainAwareProps {
  serverDomain?: string;
  serverSubdomain?: string;
  serverStoreName?: string | null;
  children: (props: {
    domain: string;
    subdomain: string;
    storeName: string | null;
  }) => ReactNode;
}

export function DomainAware({ 
  serverDomain,
  serverSubdomain,
  serverStoreName,
  children 
}: DomainAwareProps) {
  let domainInfo = {
    domain: serverDomain || '',
    subdomain: serverSubdomain || '',
    storeName: serverStoreName || null
  };

  try {
    const context = useDomain();
    domainInfo = context;
  } catch (error) {
    // Use server props if context is not available
  }

  // Call the children function to get the ReactNode
  const content = children(domainInfo);
  
  // Return the rendered content
  return <>{content}</>;
} 