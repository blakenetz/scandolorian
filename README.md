# The Scandalorian

The hottest gossip across the Star Wars galaxy

## Setup

There are 2 runnable apps:

1. Storybook: workspace package name is `ui`
2. Nextjs app: workspace package name is `web`

Both have `dev` and `build` commands, which can be either be run from the package or in parallel from the root.

Types can be re-generated through the web app's `generate-types` command. i.e.

```cli
pnpm --filter web generate-types
```

For more information on workspaces, please see the [pnpm docs](https://pnpm.io/workspaces).

## Requirements

### Tech Stack

- [x] Monorepo architecture (components isolated from the application)
  - Including UI library, testing setup, and theme
- [x] MobX for sophisticated state management
  - including observers, initial load for isomorphic data, and READ actions (no WRITE actions)
- [x] Mantine UI library with custom component extensions
- [~] Storybook for component documentation and visual testing
  - Fully setup, but I don't have any visual tests
- [~] Jest for comprehensive testing
  - Fully setup, but I don't actually use it 😬
- [x] CSS Modules (exclusively) for styling
- [x] Typescript

### Core

**1. Create a Star Wars explorer dashboard**

- [x] Displays character information with relevant details
- [x] Shows related data (e.g., homeworld, species, films appeared in)
- [x] Implements a thoughtful navigation system between different entity types (people, planets, starships)
- [x] Incorporates intelligent caching and data refresh strategies

**2. State Management**

- [x] Implement a scalable MobX architecture that could support future expansion
- [x] Demonstrate clean separation between UI and business logic
- [~] Handle complex state transitions gracefully (loading, errors, empty states)
  - Does not handle empty nor error states
  - Images have loading states
- [x] Manage relationships between different Star Wars entities

**3. Component Architecture**

- [x] Create a hierarchy of reusable components extending Mantine UI
  - When applicable
- [x] Implement proper component composition patterns
  - My main concern was client vs server rendering, so I often created components to handle the differences (see any components in `apps/web/components/`)
- [~] Document components comprehensively in Storybook with various states
- [ ] Demonstrate mastery of component testing best practices
  - Did not budget for testing

**4. Code Quality & Architecture**

- [x] Organize code in a maintainable, scalable architecture
- [x] Include thoughtful error handling, logging, and performance considerations
- [x] Document architectural decisions and tradeoffs
- [x] Implement appropriate TypeScript usage for type safety

## Architectural Commentary

I made a trade-off between higher complexity vs verbosity. You can see my routes are wildcard and every view shares the same layout, so there is minimal variation between the views. In short I have 3 views: home, entity overview, and entity detail. I used strict types to determine if an entity was valid or registered or not. In short, there is a tight coupling between the routes and the MobX store.

I opted for a very small MobX/client cache and instead went heavy on server-side rendering. With this said, there is no partial renders and very little client-side renders. I called this out in [next steps](#next-steps).

There is also a unique domain modeling, which doesn't match 100% to SWAPI. For example, I merged the `starships` and `vehicles` into a single interface called `rides`. This was to better represent the data to our domain, which was less Star Wars and more gossip Page Six.

The SB components is "render-agnostic". By this I mean, they aren't tied to a SSR framework nor are RSC. They are simple components that are _theoretically_ isomorphic.

## Next Steps

- Loading states for the views
  - I only have a couple component-level loading states, which are mainly for images
- Error states for the views
- Partial-renders
  - Essentially if the data isn't there, the page doesn't load
- Larger cache for offline support
  - There is a strict coupling between the SWAPI uptime and this app -- If SWAPI is down, then so is this app.

## Commentary

I know the use of AI was forbidden, so I want to be honest about my AI usage. I used a couple different agents/tools to generate the copy, prototyping and while ironing out some of the config files.
