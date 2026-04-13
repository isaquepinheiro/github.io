import { themes as prismThemes } from 'prism-react-renderer';
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Tecsis Informática',
  tagline: 'Documentação técnica',
  favicon: 'img/tecsis-favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://www.isaquepinheiro.com.br',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/docs/',
  trailingSlash: true,
  scripts: [{ src: '/docs/js/navbar-dynamic.js', defer: true }],

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'isaquepinheiro',
  projectName: 'isaquepinheiro.github.io',

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'pt-BR',
    locales: ['pt-BR', 'en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          routeBasePath: '/',
          sidebarPath: './sidebars.ts',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    announcementBar: {
      id: 'docs-quality',
      content:
        'Portal técnico da Tecsis Informática com foco em onboarding e referência operacional.',
      backgroundColor: '#e0ecff',
      textColor: '#1e3a8a',
      isCloseable: true,
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      logo: {
        alt: 'Tecsis Informática',
        src: 'img/tecsis-logo.svg',
      },
      items: [
        { href: 'https://www.isaquepinheiro.com.br', label: 'Site', position: 'left' },
        {
          type: 'docSidebar',
          sidebarId: 'docsSidebar',
          position: 'left',
          label: 'Portal',
        },
        {
          type: 'dropdown',
          label: 'Projetos',
          position: 'left',
          items: [
            { to: '/nidus/', label: 'Nidus' },
            { to: '/mcibr-csharp/', label: 'MCIBr-CSharp' },
            { to: '/di/', label: 'InjectContainer' },
            { to: '/developer-friends/', label: 'Developer Friends' },
            { to: '/cryptopilot/', label: 'CryptoPilot' },
          ],
        },
        { type: 'localeDropdown', position: 'right' },
        { type: 'search', position: 'right' },
        {
          href: 'https://github.com/isaquepinheiro',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'light',
      links: [
        {
          title: 'Portal',
          items: [
            { label: 'Início', to: '/' },
            { label: 'Getting to Know', to: '/getting-to-know/' },
            { label: 'Roadmap', to: '/roadmap/' },
          ],
        },
        {
          title: 'Projeto',
          items: [
            { label: 'MCIBr-CSharp', to: '/mcibr-csharp/' },
            { label: 'FAQs', to: '/faqs/' },
            { label: 'Usage Policy', to: '/usage-policy/' },
          ],
        },
        {
          title: 'Links',
          items: [
            { label: 'Site principal', href: 'https://www.isaquepinheiro.com.br/' },
            { label: 'GitHub', href: 'https://github.com/isaquepinheiro' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Tecsis Informática.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  themes: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        language: ['pt', 'en'],
      },
    ],
  ],
};

export default config;



