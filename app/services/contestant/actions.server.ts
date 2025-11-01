import { json, redirect } from "@remix-run/node"

import { getFingerprint, setToast } from "~/lib/session.server"
import { contestantRepo } from "./contestant.server"
import { IEditContestantDTO, IGetTallyLinkDTO, IToggleEvictContestantDTO, IVoteContestantDto } from "./types/contestant.interface"


export class ContestantServer{

}



export async function editContestant(payload: { dto: FormData, contestantId: string }, request: Request) {
    const dto = prepareContestantDTO(payload.dto)

    const { data, error } = await contestantRepo.editContestantAdmin({ dto, contestantId: payload.contestantId })
    if (data) {
        const { headers } = await setToast({ request, toast: `success::The contestant info has been updated::${Date.now()}` })
        return json(null, { headers })
    }
    const { headers } = await setToast({ request, toast: `error::${error.detail ?? "Could not update the contestant"}::${Date.now()}` })
    dto.entries().forEach(entry => {
        console.log(entry)
    })
    return json(error, { headers })
}

export async function toggleEvictContestants(formData: FormData, request: Request) {
    const dto: IToggleEvictContestantDTO = {
        action: formData.get("intent") as "evict" | "admit",
        stage_id: formData.get("stage_id") as string,
        contestants_ids: (formData.get("contestants_ids") as string).split("|")
    }
    const { error } = await contestantRepo.toggleEvictContestants(dto)
    if (error) {
        const { headers } = await setToast({ request, toast: `error::${error.detail ?? "Sorry, we could not update the contestants statuses at this time"}::${Date.now()}` })
        return json(error, { headers })
    }
    const { headers } = await setToast({ request, toast: `success::The contestants' statuses have been updated::${Date.now()}` })
    return json(null, { headers })
}

export async function registerContestant(formData: FormData, request: Request) {
    const contestId = formData.get("contestId") as string
    const { data, error } = await contestantRepo.registerContestant({ contestId, dto: formData })
    if (error) {
        const { headers } = await setToast({ request, toast: `error::${error.detail ?? "Error registering the contestant"}::${Date.now()}` })
        return json({ data: null }, { headers })
    }
    return json({ data })
}

export async function getTallyLink(formData: FormData, request: Request) {
    const dto: IGetTallyLinkDTO = {
        contestant_id: formData.get("contestant_id") as string,
        email: formData.get("email") as string,
        number_of_votes: +(formData.get("vote_quantity") as string),
        phone_number: formData.get("phone") as string,
        provider: formData.get("provider") as string,
        redirect_url: formData.get("redirect_url") as string
    }
    const { data, error } = await contestantRepo.getTallyLink(dto)
    if (error) {
        const { headers } = await setToast({ request, toast: `error::${error.detail ?? "We're sorry, but there seems to be an issue with this action. Please try again later."}::${Date.now()}` })
        return json(error, { headers })
    }
    const { headers } = await setToast({ request, toast: `success::You will be redirected to make the payment::${Date.now()}` })
    return redirect(data.payment_link, { headers })
}

export async function voteContestant(formData: FormData, request: Request) {
    const dto: IVoteContestantDto = {
        contestant_id: formData.get("contestant_id") as string
    }
    const stageId = formData.get("stage_id") as string
    const { fingerprint, headers: fingerprintHeaders } = await getFingerprint({ request })
    const { error } = await contestantRepo.voteContestant({ dto, stageId, fingerprint })
    if (error) {
        const { headers } = await setToast({ request, headers: fingerprintHeaders, toast: `error::${error.detail ?? "We're sorry, but there seems to be an issue with this action. Please try again later."}::${Date.now()}` })
        return json(error, { headers })
    }
    const { headers } = await setToast({ request, headers: fingerprintHeaders, toast: `success::Your vote has been registered::${Date.now()}` })
    return json(null, { headers })
}

export async function callTallyWebhook(tx_ref: string) {
    const dto = { "tx_ref": tx_ref}
    return await contestantRepo.callTallyWebhook(dto)
}


export function prepareContestantDTO(formData: FormData) {
    const payloadObj: IEditContestantDTO = {
        "biodata": {
            "first_name": formData.get("first_name") as string,
            "last_name": formData.get("last_name") as string,
            "dob": formData.get("dob") as string,
            "sex": formData.get("sex") as string,
            "email": formData.get("email") as string,
            "state_of_residence": formData.get("state") as string,
            // "whatsapp_no": formData.get("whatsapp_no") as string
        },
        "social_media_url": formData.get("name") as string,
        "vote": {
            "social_media": +(formData.get("social_media_vote") as string),
            "judge": +(formData.get("judge_vote") as string),
            "bonus": +(formData.get("stage_bonus") as string),
        }
    }
    const dto = new FormData()
    if(formData.get("media") && (formData.get("media") as File).size > 0){

        dto.append("media", formData.get("media") as Blob)
    }
    dto.append("details", JSON.stringify(payloadObj))
    return dto
}
