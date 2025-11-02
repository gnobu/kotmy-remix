import { ApiCall } from "~/lib/api/fetcher";
import { ILoginDTO, ILoginResponseDTO } from "./types/auth.dtos";
import { ApiEndPoints } from "~/lib/api/endpoints";


export default class AuthServer {
    async login(loginDto: ILoginDTO) {
        let  { data, error, headers }  = await ApiCall.call<ILoginResponseDTO, unknown>({
                    url: ApiEndPoints.login,
                    method: "POST",
                    data: loginDto
                })

        
        if (error) return { error: error, data: null, headers }
        if(!headers){
            headers = {'Set-Cookie': data?.token ?? ''}
        }
        return { data, error: null, headers }
    }
}


export const authServer = new AuthServer();