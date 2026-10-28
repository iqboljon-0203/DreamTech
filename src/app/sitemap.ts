import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  const routes = ['/', '/ru', '/en'];
  
  return routes.map((route) => ({
    url: route === '/' ? `${SITE_URL}/` : `${SITE_URL}${route}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: route === '/' ? 1 : 0.8,
  }));
}
