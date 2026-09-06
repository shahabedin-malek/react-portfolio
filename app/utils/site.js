import config from '~/config.json';

const githubPagesHost = 'shahabedin-malek.github.io';
const githubPagesPath = '/react-portfolio';

function isGithubPagesBuild() {
  return (
    import.meta.env.BASE_URL.startsWith(githubPagesPath) ||
    (typeof process !== 'undefined' && process.env.DEPLOY_TARGET === 'github-pages')
  );
}

export function sitePath(pathname) {
  const basePath = isGithubPagesBuild()
    ? githubPagesPath
    : import.meta.env.BASE_URL.replace(/\/$/, '');
  const path = pathname.startsWith('/') ? pathname : `/${pathname}`;

  return `${basePath}${path}` || '/';
}

export function getSiteBaseUrl(requestUrl) {
  const url = new URL(requestUrl);

  if (url.hostname === githubPagesHost) {
    return `${config.githubPagesUrl}${githubPagesPath}`;
  }

  return url.origin;
}

export function getCanonicalUrl(requestUrl) {
  const url = new URL(requestUrl);
  const baseUrl = getSiteBaseUrl(requestUrl);
  const isGithubBuild = isGithubPagesBuild();
  const pathname =
    (url.hostname === githubPagesHost && url.pathname.startsWith(githubPagesPath)) ||
    isGithubBuild
      ? url.pathname.slice(githubPagesPath.length) || '/'
      : url.pathname;

  return isGithubBuild
    ? `${config.githubPagesUrl}${githubPagesPath}${pathname}`
    : `${baseUrl}${pathname}`;
}