import { formatTimecode, readingTime } from '~/utils/timecode';

export async function getPosts() {
  const modules = import.meta.glob('../articles.*.mdx', {
    eager: true,
    query: '?raw',
    import: 'default',
  });

  const build = await import('virtual:remix/server-build');

  const posts = await Promise.all(
    Object.entries(modules).map(async ([file, rawContent]) => {
      const id = file.replace('../', 'routes/').replace(/\.mdx$/, '');

      const route = build.routes[id];

      if (!route) {
        throw new Error(`No route for ${id}`);
      }

      const slug = route.path;

      if (slug === undefined) {
        throw new Error(`No route path for ${id}`);
      }

      const text =
        typeof rawContent === 'string'
          ? rawContent
          : String(rawContent ?? '');

      const readTime = readingTime(text);
      const timecode = formatTimecode(readTime);

      const postModule = await import(`../articles.${slug}.mdx`);

      return {
        slug,
        timecode,
        frontmatter: postModule.frontmatter,
      };
    })
  );

  return sortBy(posts, post => post.frontmatter.date, 'desc');
}

function sortBy(arr, key, dir = 'asc') {
  return arr.sort((a, b) => {
    const res = compare(key(a), key(b));
    return dir === 'asc' ? res : -res;
  });
}

function compare(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}