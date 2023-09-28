const fs = require('fs-extra');
const dotenv = require('dotenv');

const buildVercelConfigFile = () => {
  dotenv.config();

  const active = process.env.NEXT_PUBLIC_ACTIVE_WEB3MAIL;
  if (active === 'false') {
    return;
  }

  console.log('Building Vercel config file');

  const cronApiKey = process.env.NEXT_PRIVATE_CRON_KEY;
  console.log('cronApiKey', cronApiKey);
  if (!cronApiKey) {
    console.log('No cron key found');
    return;
  }

  const filename = './vercel.json';

  if (!fs.existsSync(filename)) {
    console.log('No vercel.json file found');
    return;
  }

  let vercelConfig = fs.readFileSync(filename, 'utf8');
  vercelConfig = vercelConfig.replaceAll('NEXT_PRIVATE_CRON_KEY', cronApiKey);
  fs.writeFileSync('./vercel.json', vercelConfig, 'utf8');

  console.log('Vercel config file built');
};

buildVercelConfigFile();
