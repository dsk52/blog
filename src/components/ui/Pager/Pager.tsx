import Link from 'next/link';
import { VFC } from "react"

type Prop = {
  label: string
  url: string
}

export const Pager: VFC<Prop> = (prop) => {
  return (
    <>
      <Link
        href={prop.url}
      >
        {prop.label}
      </Link>
    </>
  )
}
