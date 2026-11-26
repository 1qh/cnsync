# cnsync

cnsync mirrors all shadcn/ui Base UI components. For each component and AI pattern, it looks for a demo in the upstream shadcn/ui documentation, then falls back to the upstream Base UI example source. The sync uses the shadcn/ui registry, documentation, and example sources.

## Packages

- `readonly/ui` is the flat `@a/ui` package. It exposes `components/`, `hooks/`, `lib/`, and `styles/` directly. Import the shared utilities from `@a/ui` or `@a/ui/lib/utils` and the global stylesheet from `@a/ui/globals.css`.
- `readonly/examples` is the generated `@a/examples` package. It includes component demos in `components/`, AI pattern demos in `patterns/`, and shared upstream helpers in `lib/`. The `examples` export lists each demo by kind and name.

The mirrored components use upstream Base UI implementations. The only styling patches configure the Tailwind Typography plugin and set the dark background to pure black.

## Usage

Copy `readonly/ui` into your workspace and use its package name, `@a/ui`. Copy `readonly/examples` alongside it when you want the demo catalog.

## Auto-sync

GitHub Actions syncs the components and rebuilds the demos on Mondays and Thursdays at 02:00 UTC.

The sync generates both packages in a staging directory and type-checks the demos before replacing the copies in `readonly/`. It reports missing upstream demos and demos excluded because of type errors.
