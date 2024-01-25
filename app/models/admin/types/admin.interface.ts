export interface IAdmin {
    'id': string;
    'full_name': string;
    'email': string;
    'username': string;
    'password': string;
    'role': string;
    'permissions': string[];
    'access': boolean;
}

export interface ICreateAdminDto {
    'full_name': string;
    'email': string;
    'username': string;
    'password': string;
    'role': string;
    'permissions': string[];
}

export interface IUpdateAdminDto extends ICreateAdminDto {}