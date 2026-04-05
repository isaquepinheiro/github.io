import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

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
        { type: 'link', label: 'Nidus', href: '/nidus/' },
        { type: 'link', label: 'MCIBr-CSharp', href: '/mcibr-csharp/' },
        { type: 'link', label: 'InjectContainer', href: '/di/' },
        { type: 'link', label: 'Developer Friends', href: '/developer-friends/' },
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
      link: { type: 'doc', id: 'nidus/index' },
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
      link: { type: 'doc', id: 'mcibr-csharp/index' },
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
  injectContainerSidebar: [
    {
      type: 'category',
      label: 'InjectContainer',
      link: { type: 'doc', id: 'di/index' },
      items: [
        'di/introduction',
        {
          type: 'category',
          label: 'Getting Started',
          items: ['di/getting-started/installation', 'di/getting-started/quickstart'],
        },
        {
          type: 'category',
          label: 'Conceitos',
          items: ['di/concepts/core-concepts'],
        },
        {
          type: 'category',
          label: 'Arquitetura',
          items: ['di/architecture/overview', 'di/architecture/runtime-flow'],
        },
        {
          type: 'category',
          label: 'Tutoriais',
          items: ['di/tutorials/common-workflows'],
        },
        {
          type: 'category',
          label: 'Referência',
          items: ['di/reference/api'],
        },
        {
          type: 'category',
          label: 'Exemplos',
          items: ['di/examples/overview'],
        },
        {
          type: 'category',
          label: 'Testes e Suporte',
          items: ['di/tests/overview', 'di/troubleshooting/common-errors', 'di/faq', 'di/roadmap'],
        },
      ],
    },
  ],
  developerFriendsSidebar: [
    {
      type: 'category',
      label: 'Developer Friends',
      link: { type: 'doc', id: 'developer-friends/index' },
      items: [
        'developer-friends/introduction',
        {
          type: 'category',
          label: 'Getting Started',
          items: ['developer-friends/getting-started/quickstart'],
        },
        {
          type: 'category',
          label: 'Arquitetura',
          items: [
            'developer-friends/architecture/overview',
            'developer-friends/architecture/runtime-flow',
          ],
        },
        {
          type: 'category',
          label: 'Referência',
          items: ['developer-friends/reference/api'],
        },
        {
          type: 'category',
          label: 'Testes e Suporte',
          items: [
            'developer-friends/tests/overview',
            'developer-friends/troubleshooting/common-errors',
          ],
        },
      ],
    },
  ],
};

export default sidebars;



