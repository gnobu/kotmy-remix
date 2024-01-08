import { cssBundleHref } from "@remix-run/css-bundle"
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react"
import globalStyles from './global.css'
import autoplaycarouselStyles from "./autoplaycarousel.css"
import { nickToast } from "./lib/session.server"
import Toast from "./components/reusables/Toast"

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: globalStyles },
  { rel: "stylesheet", href: autoplaycarouselStyles },
]


export async function loader({ request }: LoaderFunctionArgs) {
  const { toast } = await nickToast({ request })
  return { toast }
}

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="font-satoshi text-primary">
        {/* <PageTransitionProgressBar /> */}
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function App() {
  const { toast } = useLoaderData<typeof loader>()
  return (
    <Document>
      <Toast toast={toast} />
      <Outlet />
    </Document>
  )
}
