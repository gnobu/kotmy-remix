import { useEffect } from "react"
import { cssBundleHref } from "@remix-run/css-bundle"
import { json, type LinksFunction, type LoaderFunctionArgs } from "@remix-run/node"
import {
  isRouteErrorResponse,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRouteError,
} from "@remix-run/react"
import globalStyles from './global.css'
import autoplaycarouselStyles from "./autoplaycarousel.css"
import { nickToast } from "./lib/session.server"
import PageTransitionProgressBar from "./components/reusables/PageProgress"
import Cta from "./components/reusables/Cta"
import { Toaster } from "./components/reusables/toaster"
import { useToast } from "./components/reusables/use-toast"
import { SplitToast } from "./lib/types/toast"

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: globalStyles },
  { rel: "stylesheet", href: autoplaycarouselStyles },
]


export async function loader({ request }: LoaderFunctionArgs) {
  const { toast, headers } = await nickToast({ request })
  return json({ toast }, { headers })
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
        <PageTransitionProgressBar />
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}

export default function App() {
  const { toast: toastMsg } = useLoaderData<typeof loader>()
  const { toast } = useToast()
  useEffect(() => {
    if (toastMsg) {
      const [type, message] = toastMsg.split('::') as SplitToast<typeof toastMsg>
      toast({
        title: type === "success" ? "Success!" : "Oops! There seems to be a problem",
        variant: type === "success" ? "default" : "destructive",
        description: message,
      })
    }
  }, [toastMsg])

  return (
    <Document>
      <Outlet />
      <Toaster />
    </Document>
  )
}

export function ErrorBoundary() {
  const error = useRouteError()
  let heading = 'Unexpected Error'
  let message =
    'We are very sorry. An unexpected error occurred. Please try again or contact us if the problem persists.'
  if (isRouteErrorResponse(error)) {
    switch (error.status) {
      case 401:
        heading = '401 Unauthorized'
        message = 'Oops! Looks like you tried to visit a page that you do not have access to.'
        break
      case 404:
        heading = '404 Not Found'
        message = 'Oops! Looks like you tried to visit a page that does not exist.'
        break
    }
  }
  const errorMessage = error instanceof Error ? error.message : null
  return (
    <Document>
      <section className="h-dvh p-5 grid gap-5 place-content-center text-center">
        <h1 className="text-xl font-bold text-red-500">{heading}</h1>
        <p>{message}</p>
        {errorMessage && (
          <div className="border-4 border-red-500 p-10">
            <p>Error message: {errorMessage}</p>
          </div>
        )}
        <Cta element="link" to="/" className="px-4 py-1 rounded-md">Back to homepage</Cta>
      </section>
    </Document>
  )
}