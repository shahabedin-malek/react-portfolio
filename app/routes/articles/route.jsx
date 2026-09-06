import { json } from '@remix-run/cloudflare';
import { Outlet, useLoaderData } from '@remix-run/react';
import { MDXProvider } from '@mdx-js/react';
import { Post, postMarkdown } from '~/layouts/post';
import { baseMeta } from '~/utils/meta';
import { formatTimecode, readingTime } from '~/utils/timecode';
import { getSiteBaseUrl } from '~/utils/site';

export async function loader({ request }) {
  const slug = request.url.split('/').at(-1);
  const module = await import(`../articles.${slug}.mdx`);
  const text = await import(`../articles.${slug}.mdx?raw`);
  const markdown =
    typeof text.default === 'string'
      ? text.default
      : text.default?.default || text.default?.value || '';
  const readTime = readingTime(markdown);
  const ogImage = `${getSiteBaseUrl(request.url)}/static/${slug}-og.jpg`;

  return json({
    ogImage,
    frontmatter: module.frontmatter,
    timecode: formatTimecode(readTime),
  });
}

export function meta({ data }) {
  const { title, abstract } = data.frontmatter;
  return baseMeta({ title, description: abstract, prefix: '', ogImage: data.ogImage });
}

export default function Articles() {
  const { frontmatter, timecode } = useLoaderData();

  return (
    <MDXProvider components={postMarkdown}>
      <Post {...frontmatter} timecode={timecode}>
        <Outlet />
      </Post>
    </MDXProvider>
  );
}
