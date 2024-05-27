import React from "react"

import { cn } from "~/lib/utils"
import Cta from "~/components/reusables/Cta"
import Svg from "~/components/reusables/Svg"
import { socialIcons } from "~/lib/data/socials"
import { useFetcher } from "@remix-run/react"

type Props = | {
    type: Exclude<keyof typeof socialIcons, "kotmy">,
    url?: string,
    className?: string,
    voted?: boolean,
    contestantId?: string,
    stageId?: string,
} | {
    type: Extract<keyof typeof socialIcons, "kotmy">,
    url?: string,
    className?: string,
    voted: boolean,
    contestantId: string,
    stageId: string,
}

export default React.forwardRef(function SocialLink(
    { type, url, className = "", ...rest }: Props,
    ref: React.ForwardedRef<HTMLButtonElement>) {
    const props = url
        ? { element: "link", to: url, ...rest } as const
        : { element: "button", ref, ...rest } as const
    const fetcher = useFetcher()
    return type === "kotmy"
        ? <fetcher.Form method="POST">
            <input type="hidden" name="contestant_id" value={rest.contestantId} />
            <input type="hidden" name="stage_id" value={rest.stageId} />
            <Cta element="button" name="intent" value="kotmy_vote" variant="outline" className={cn("p-2 flex items-center border rounded-full w-full", className)}>
                <span className={cn("w-6 h-6 flex items-center justify-center rounded-full p-1")}>
                    <Svg src={socialIcons[type]} />
                </span>
                <span className="grow text-xs font-bold text-center mr-2">
                    {rest.voted ? null : <span className="capitalize">{type}</span>}
                    {rest.voted ? "Voted" : " vote"}
                </span>
            </Cta>
        </fetcher.Form>
        : <Cta {...props} variant="outline" className={cn("p-2 flex items-center border rounded-full", {
            "border-facebook text-facebook bg-facebookBG hover:bg-facebook/15": type === "facebook",
            "border-instagram text-instagram bg-instagramBG hover:bg-instagram/15": type === "instagram",
            "border-twitter text-twitter bg-twitterBG hover:bg-twitter/15": type === "twitter",
            "border-tally text-tally bg-tallyBG hover:bg-tally/15": type === "tally",
            "border-givaah text-givaah bg-givaahBG hover:bg-givaah/15": type === "givaah",
        }, className)}>
            <span className={cn("w-6 h-6 flex items-center justify-center rounded-full p-1", {
                "bg-facebook": type === "facebook",
                "bg-instagram": type === "instagram",
                "bg-twitter": type === "twitter",
                "bg-tally": type === "tally",
                "bg-givaah": type === "givaah",
            })}>
                <Svg src={socialIcons[type]} />
            </span>
            <span className="grow text-xs font-bold text-center mr-2"><span className="capitalize">{type}</span> vote</span>
        </Cta>
})
