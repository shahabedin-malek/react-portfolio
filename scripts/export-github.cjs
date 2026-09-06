const { spawn } = require('node:child_process');
const { mkdir, readdir, readFile, writeFile } = require('node:fs/promises');
const { dirname, join } = require('node:path');

const root = process.cwd();
const output = join(root, 'build', 'client');
const isGithub = process.env.DEPLOY_TARGET === 'github-pages';
const requestBase = isGithub ? '/react-portfolio' : '';
const siteOrigin = isGithub
  ? 'https://shahabedin-malek.github.io'
  : process.env.SITE_ORIGIN || '';
const routes = [
  '/',
  '/articles',
  '/articles/hello-world',
  '/articles/modern-styling-in-react',
  '/contact',
];

const server = spawn(
  'npx',
  ['wrangler', 'pages', 'dev', output, '--port', '8788', '--local'],
  {
  cwd: root,
  stdio: 'ignore',
  }
);

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(`http://127.0.0.1:8788${requestBase}/`);
      if (response.ok) return;
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  throw new Error('Wrangler preview did not start');
}

async function exportRoute(pathname) {
  const response = await fetch(`http://127.0.0.1:8788${requestBase}${pathname}`);
  if (!response.ok) throw new Error(`${pathname} returned ${response.status}`);

  let html = await response.text();

  if (siteOrigin) {
    html = html
      .replaceAll('http://127.0.0.1:8788', siteOrigin)
      .replace(
        /(<link rel="canonical" href=")[^"]+/,
        `$1${siteOrigin}${requestBase}${pathname}`
      );
  }

  if (isGithub) {
    html = html
      .replace(
        /(href|src)=(['"])\/(?!react-portfolio(?:\/|#|['"]))/g,
        '$1=$2/react-portfolio/'
      );
  }
  const filePath = pathname === '/' ? join(output, 'index.html') : join(output, pathname, 'index.html');
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, html);
}

async function rewriteAssetReferences() {
  if (!isGithub) return;

  const files = await readdir(output, { recursive: true });

  await Promise.all(
    files
      .filter(file => /\.(css|html|js|json)$/.test(file))
      .map(async file => {
        const filePath = join(output, file);
        const contents = await readFile(filePath, 'utf8');
        const rewritten = contents
          .replaceAll('/assets/', '/react-portfolio/assets/')
          .replaceAll('/draco/', '/react-portfolio/draco/')
          .replaceAll('/react-portfolio/react-portfolio/', '/react-portfolio/');

        if (rewritten !== contents) await writeFile(filePath, rewritten);
      })
  );
}

async function main() {
  await waitForServer();
  await Promise.all(routes.map(exportRoute));
  await writeFile(join(output, '404.html'), await readFile(join(output, 'index.html')));
  await rewriteAssetReferences();
  server.kill('SIGTERM');
}

main().catch(error => {
  server.kill('SIGTERM');
  console.error(error);
  process.exitCode = 1;
});