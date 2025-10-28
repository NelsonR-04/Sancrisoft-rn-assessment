import { FC } from 'react';
import { ExternalLinkProps } from '@/components/ui/External-link/external-link.types';
import { Link } from 'expo-router';
import { openBrowserAsync, WebBrowserPresentationStyle } from 'expo-web-browser';

const ExternalLink: FC<ExternalLinkProps> = ({ href, ...rest }) => (
  <Link
    target="_blank"
    {...rest}
    href={href}
    onPress={async (event) => {
      if (process.env.EXPO_OS !== 'web') {
        event.preventDefault();
        await openBrowserAsync(href, {
          presentationStyle: WebBrowserPresentationStyle.AUTOMATIC,
        });
      }
    }}
  />
);

export default ExternalLink;
