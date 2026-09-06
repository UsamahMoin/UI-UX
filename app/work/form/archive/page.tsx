import type { Metadata } from 'next';

import { FormArchive } from '@/components/form-archive';
import { sitePath } from '@/lib/site-path';

const siteOrigin = process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://atelier-index-ui-ux.usamahmoin.chatgpt.site';
const previewImage = new URL(sitePath('/images/form-human.png'), siteOrigin).toString();

export const metadata: Metadata = {
  title: 'FORM — Independent Culture Archive',
  description: 'An expressive archive of people, objects, and ideas that alter how we see the everyday.',
  openGraph: { title: 'FORM — Independent Culture Archive', description: 'Things worth keeping.', images: [previewImage] },
  twitter: { title: 'FORM — Independent Culture Archive', description: 'Things worth keeping.', images: [previewImage] },
};

export default function FormArchivePage() {
  return <FormArchive />;
}
