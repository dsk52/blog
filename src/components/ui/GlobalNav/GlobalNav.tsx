import Link from "next/link"

import type { VFC } from 'react';

const GlobalNav: VFC = () => (
  <nav>
    <Link href="/about">About</Link>
  </nav>
)

export { GlobalNav }
