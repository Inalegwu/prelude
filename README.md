# Prelude

**Prelude** is a utility package containing reusable functions and tools commonly used in mobile and web development projects. Designed to streamline development workflows, this package consolidates essential utilities into one easy-to-use module.

## Features

- **Reusable Utilities**: Functions optimized for frequent use in diverse projects.
- **Cross-Platform**: Suitable for both mobile and web development.
- **TypeScript Support**: Fully typed for enhanced developer experience.

## Installation

To add Prelude to your project, run:

```bash
npx jsr add @disgruntleddevs/prelude
```

Bun
```bash
bunx jsr add @disgruntleddevs/prelude
```

Or if you're using Deno
```bash
deno add jsr:@disgruntleddevs/prelude
```


# Usage

Here's a quick example:
```ts
import {Hash} from "@disgruntleddevs/prelude"

const uid=Hash.randomuuid();

console.log(uid);
```