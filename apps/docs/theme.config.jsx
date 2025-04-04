export default {
  logo: <span>Documentation</span>,
  project: {
    link: 'https://github.com/asadkomidev/turbo-convex-starter'
  },
  docsRepositoryBase: 'https://github.com/asadkomidev/turbo-convex-starter',
  useNextSeoProps() {
    return {
      titleTemplate: '%s – Documentation'
    }
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://nextra.site" target="_blank">
          Documentation
        </a>
      </span>
    )
  }
}
