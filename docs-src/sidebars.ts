import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    'getting-to-know',
    {
      type: 'category',
      label: 'Projetos',
      items: [
        {type: 'link', label: 'Nidus', href: '/docs/nidus/'},
        {type: 'link', label: 'MCIBr-CSharp', href: '/docs/mcibr-csharp/'},
      ],
    },
    {
      type: 'category',
      label: 'Frequently Asked Questions',
      items: ['faqs'],
    },
    {
      type: 'category',
      label: 'Guides',
      items: ['guides/new-project-docs'],
    },
    {
      type: 'category',
      label: 'Usage Policy',
      items: ['usage-policy'],
    },
    {
      type: 'category',
      label: 'Roadmap',
      items: ['roadmap'],
    },
  ],
  nidusSidebar: [
    {
      type: 'category',
      label: 'Nidus',
      link: {type: 'doc', id: 'nidus/index'},
      items: [
        'nidus/introduction',
        {
          type: 'category',
          label: 'Getting Started',
          items: ['nidus/getting-started/installation', 'nidus/getting-started/quickstart'],
        },
        {
          type: 'category',
          label: 'Arquitetura',
          items: ['nidus/architecture/overview', 'nidus/architecture/runtime-flow'],
        },
        {
          type: 'category',
          label: 'Guias',
          items: [
            'nidus/guides/horse',
            'nidus/guides/modules',
            'nidus/guides/routes',
            'nidus/guides/middlewares',
            'nidus/guides/dependency-injection',
            'nidus/guides/module-cache',
            'nidus/guides/route-handlers',
            'nidus/guides/response-cache',
            'nidus/guides/pooling',
            'nidus/guides/cli',
          ],
        },
        {
          type: 'category',
          label: 'Referência',
          items: ['nidus/reference/api'],
        },
        {
          type: 'category',
          label: 'Testes e Suporte',
          items: ['nidus/tests/overview', 'nidus/troubleshooting/common-errors'],
        },
      ],
    },
  ],
  mcibrSidebar: [
    {
      type: 'category',
      label: 'MCIBr-CSharp',
      link: {type: 'doc', id: 'mcibr-csharp/index'},
      items: [
        'mcibr-csharp/introduction',
        {
          type: 'category',
          label: 'Getting Started',
          items: ['mcibr-csharp/getting-started/quickstart'],
        },
        {
          type: 'category',
          label: 'Arquitetura',
          items: ['mcibr-csharp/architecture/overview', 'mcibr-csharp/architecture/runtime-flow'],
        },
        {
          type: 'category',
          label: 'Referência',
          items: ['mcibr-csharp/reference/api'],
        },
        {
          type: 'category',
          label: 'Testes e Suporte',
          items: ['mcibr-csharp/tests/overview', 'mcibr-csharp/troubleshooting/common-errors'],
        },
      ],
    },
  ],
};

export default sidebars;
