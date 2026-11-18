import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SITE_URL = 'https://theraptoracademics.com';
const DEFAULT_IMAGE = 'https://res.cloudinary.com/ppkvzeli/image/upload/v1794899393/Education_Counseling.png';

const SEO = ({
  title,
  description,
  keywords = 'Study in Malta, Malta Study Visa Consultants in Jaipur, Overseas Education Consultants Jaipur, Study in Europe without IELTS, The Raptor Academics',
  ogImage = DEFAULT_IMAGE,
  noIndex = false,
}) => {
  const { pathname } = useLocation();
  const canonicalUrl = `${SITE_URL}${pathname === '/' ? '' : pathname}`;

  useEffect(() => {
    // 1. Page Title
    document.title = title;

    // Helper to create or update meta tags
    const setMetaTag = (attrName, attrValue, content) => {
      if (!content) return;
      let tag = document.querySelector(`meta[${attrName}="${attrValue}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attrName, attrValue);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    };

    // 2. Standard SEO Meta Tags
    setMetaTag('name', 'description', description);
    setMetaTag('name', 'keywords', keywords);
    setMetaTag('name', 'robots', noIndex ? 'noindex, nofollow' : 'index, follow');

    // 3. Open Graph (WhatsApp, Facebook, LinkedIn Preview)
    setMetaTag('property', 'og:type', 'website');
    setMetaTag('property', 'og:site_name', 'The Raptor Academics');
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:image', ogImage);

    // 4. Twitter Card Tags
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 5. Canonical Link Tag
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonicalUrl);
  }, [title, description, keywords, ogImage, canonicalUrl, noIndex]);

  return null;
};

export default SEO;