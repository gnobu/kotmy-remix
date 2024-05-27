import { json, redirect } from "@remix-run/node"

import { getFingerprint, setToast } from "~/lib/session.server"
import { contestantRepo } from "./contestant.server"
import { IEditContestantDTO, IGetTallyLinkDTO, IToggleEvictContestantDTO, IVoteContestantDto } from "./types/contestant.interface"

export async function editContestant(payload: { dto: FormData, contestantId: string }, request: Request) {
    const dto = prepareContestantDTO(payload.dto)
    const { data, error } = await contestantRepo.editContestant({ dto, contestantId: payload.contestantId })
    if (data) {
        const { headers } = await setToast({ request, toast: "success::The contestant info has been updated" })
        return json(null, { headers })
    }
    const { headers } = await setToast({ request, toast: `error::${error.detail ?? "Could not update the contestant"}` })
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
        const { headers } = await setToast({ request, toast: `error::${error.detail ?? "Sorry, we could not update the contestants statuses at this time"}` })
        return json(error, { headers })
    }
    const { headers } = await setToast({ request, toast: "success::The contestants' statuses have been updated" })
    return json(null, { headers })
}

export async function registerContestant(formData: FormData, request: Request) {
    const contestId = formData.get("contestId") as string
    const { data, error } = await contestantRepo.registerContestant({ contestId, dto: formData })
    if (error) {
        const { headers } = await setToast({ request, toast: `error::${error.detail ?? "Error registering the contestant"}` })
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
        const { headers } = await setToast({ request, toast: `error::${error.detail ?? "We're sorry, but there seems to be an issue with this action. Please try again later."}` })
        return json(error, { headers })
    }
    const { headers } = await setToast({ request, toast: "success::You will be redirected to make the payment" })
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
        const { headers } = await setToast({ request, headers: fingerprintHeaders, toast: `error::${error.detail ?? "We're sorry, but there seems to be an issue with this action. Please try again later."}` })
        return json(error, { headers })
    }
    const { headers } = await setToast({ request, headers: fingerprintHeaders, toast: "success::Your vote has been registered" })
    return json(null, { headers })
}

/**Calls the tally webhook, only for dev testing. REMOVE IN LIVE!!! */
export async function callTallyWebhook(tx_ref: string) {
    const dto = {
        "event": "charge.completed",
        "data": {
            "id": 285959875,
            "tx_ref": tx_ref,
            "flw_ref": "PeterEkene/FLW270177170",
            "device_fingerprint": "a42937f4a73ce8bb8b8df14e63a2df31",
            "amount": 100,
            "currency": "NGN",
            "charged_amount": 100,
            "app_fee": 1.4,
            "merchant_fee": 0,
            "processor_response": "Approved by Financial Institution",
            "auth_model": "PIN",
            "ip": "197.210.64.96",
            "narration": "CARD Transaction ",
            "status": "successful",
            "payment_type": "card",
            "created_at": "2020-07-06T19:17:04.000Z",
            "account_id": 17321,
            "customer": {
                "id": 215604089,
                "name": "Yemi Desola",
                "phone_number": null,
                "email": "user@gmail.com",
                "created_at": "2020-07-06T19:17:04.000Z"
            },
            "card": {
                "first_6digits": "123456",
                "last_4digits": "7889",
                "issuer": "VERVE FIRST CITY MONUMENT BANK PLC",
                "country": "NG",
                "type": "VERVE",
                "expiry": "02/23"
            }
        }
    }
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
    dto.append("media", formData.get("media") as Blob)
    dto.append("details", JSON.stringify(payloadObj))
    return dto
}
