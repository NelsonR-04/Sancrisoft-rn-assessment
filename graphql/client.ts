import { config } from '@/config/config';
import { cacheExchange, createClient, fetchExchange } from 'urql';

export const announcementsClient = createClient({
  url: `${config.contentfulGraphqlURL}/spaces/${config.announcementsCarouselSpaceId}/environments/${config.contentfulEnv}`,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${config.announcementsCarouselToken}`,
    },
  },
});

export const heroSliderClient = createClient({
  url: `${config.contentfulGraphqlURL}/spaces/${config.heroSliderSpaceId}/environments/${config.contentfulEnv}`,
  exchanges: [cacheExchange, fetchExchange],
  fetchOptions: {
    headers: {
      Authorization: `Bearer ${config.heroSliderToken}`,
    },
  },
});

export interface Announcement {
  backgroundColor: string;
  ctaLabel: string;
  ctaUrl: string;
  intro: string;
  message: string;
}

export interface HeroSlide {
  title: string;
  eyebrowImage: {
    url: string;
    contentType?: string;
  } | null;
  eyebrowText: string;
  targetUrl: string;
  mobileImageOrVideo: {
    url: string;
    contentType: string;
  };
  enableDarkBackdrop: boolean;
}
