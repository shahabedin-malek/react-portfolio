const { spawn } = require('node:child_process');
const { mkdir, readFile, writeFile } = require('node:fs/promises');
const { dirname, join } = require('node:path');

const root = process.cwd();
const output = join(root, 'build', 'client');
const isGithub = process.env.DEPLOY_TARGET === 'github-pages';
const siteOrigin = isGithub
  ? 'https://shahabedin-malek.github.io/react-portfolio'
  : process.env.SITE_ORIGIN || '';
const routes = [
  '/',
  '/articles',
  '/articles/hello-world',
  '/articles/modern-styling-in-react',
  '/contact',
];

const server = spawn('npx', ['wrangler', 'pages', 'dev', output, '--port', '8788'], {
  cwd: root,
  stdio: 'ignore',
});

async function waitForServer() {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch('http://127.0.0.1:8788/');
      if (response.ok) return;
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  throw new Error('Wrangler preview did not start');
}

async function exportRoute(pathname) {
  const response = await fetch(`http://127.0.0.1:8788${pathname}`);
  if (!response.ok) throw new Error(`${pathname} returned ${response.status}`);

  let html = await response.text();

  if (siteOrigin) {
    html = html.replaceAll('http://127.0.0.1:8788', siteOrigin);
  }

  if (isGithub) {
    html = html
      .replace(/(href|src)=(['"])\/(?!react-portfolio\/)/g, '$1=$2/react-portfolio/');
  }
  const filePath = pathname === '/' ? join(output, 'index.html') : join(output, pathname, 'index.html');
  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, html);
}

async function main() {
  await waitForServer();
  await Promise.all(routes.map(exportRoute));
  await writeFile(join(output, '404.html'), await readFile(join(output, 'index.html')));
  server.kill('SIGTERM');
}

main().catch(error => {
  server.kill('SIGTERM');
  console.error(error);
  process.exitCode = 1;
});