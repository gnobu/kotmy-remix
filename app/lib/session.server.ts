import { Session, createCookieSessionStorage } from "@remix-run/node" // or cloudflare/deno
import { ToastMessage } from "./types/toast"
// import invariant from "tiny-invariant"
// invariant(process.env.BASE_URL, "BASE_URL must be set")

export enum Role {
    'Role 1' = 1,
    'Role 2',
    'Role 3'
}

type SessionData = {
    role: Role
}

type SessionFlashData = {
    alert: string
}


export const { getSession, commitSession, destroySession } =
    createCookieSessionStorage<SessionData, SessionFlashData>({
        // a Cookie from `createCookie` or the CookieOptions to create one
        cookie: {
            name: "kotmy__session",
            // all of these are optional
            // domain: process.env.BASE_URL,
            httpOnly: true,
            maxAge: 60 * 60, // 1hr
            path: "/",
            sameSite: true,
            secrets: ["s3cret1"],
            // secure: true,
        },
    })

export function isAuthorized(session: Session<SessionData, SessionFlashData>, requiredRole: Role) {
    const role = session.get('role')
    return role && role >= requiredRole
}

export async function setToast({ request, headers = new Headers(), toast }:
    { request: Request, headers?: Headers, toast: ToastMessage }) {
    const session = await getSession(request.headers.get('Cookie'))
    session.flash("alert", toast)
    headers.set('Set-Cookie', await commitSession(session))
    return { headers }
}

export async function nickToast({ request, headers = new Headers() }:
    { request: Request, headers?: Headers }) {
    const session = await getSession(request.headers.get('Cookie'))
    const toast = session.get("alert") as ToastMessage | undefined
    headers.set('Set-Cookie', await commitSession(session))
    return { headers, toast }
}