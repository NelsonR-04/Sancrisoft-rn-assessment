import { ComponentProps } from 'react';
import { Href, Link } from 'expo-router';

export type ExternalLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & { href: Href & string };
