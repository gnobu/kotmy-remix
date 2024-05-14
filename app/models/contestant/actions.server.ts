import { json } from "@remix-run/node"
import { setToast } from "~/lib/session.server"
import { contestantRepo } from "./contestant.server"
import { IEditContestantDTO } from "./types/contestant.interface"

export async function editContestant(payload: { dto: FormData, contestantId: string }, request: Request) {
    const dto = prepareContestantDTO(payload.dto)
    const { data, error } = await contestantRepo.editContestant({ dto, contestantId: payload.contestantId })
    if (data) {
        const { headers } = await setToast({ request, toast: 'success::The contestant info has been updated' })
        return json(null, { headers })
    }
    const { headers } = await setToast({ request, toast: `error::${error.detail ?? 'Could not update the contestant'}` })
    return json(error, { headers })
}

export function prepareContestantDTO(formData: FormData) {
    const payloadObj: IEditContestantDTO = {
        "biodata": {
            "first_name": formData.get('first_name') as string,
            "last_name": formData.get('last_name') as string,
            "dob": formData.get('dob') as string,
            "sex": formData.get('sex') as string,
            "email": formData.get('email') as string,
            "state_of_residence": formData.get('state') as string,
            // "whatsapp_no": formData.get('whatsapp_no') as string
        },
        "social_media_url": formData.get('name') as string,
        "vote": {
            "social_media": +(formData.get('social_media_vote') as string),
            "judge": +(formData.get('judge_vote') as string),
            "bonus": +(formData.get('stage_bonus') as string),
        }
    }
    return payloadObj
}
