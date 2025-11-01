export interface ILoginDTO {
    email: string
    password: string
}



export class ILoginResponseDTO {
    email: string = "";
    fullName: string = "";
    token: string = "";
    permissions: string[] = [];
}