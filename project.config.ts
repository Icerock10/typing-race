const ProjectPrefix = {
    APP: 'tr',
    CHANGE_TYPES: [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
    ],
    ENVIRONMENT: 'main',
    ISSUE_PREFIXES: ['tr', 'release'],
    SCOPES: {
        APPS: ['frontend', 'backend'],
        PACKAGES: ['main', 'shared'],
    },
} as const;

export { ProjectPrefix };
