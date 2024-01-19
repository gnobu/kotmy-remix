export type AdminUser = {
    'id': string;
    'full_name': string;
    'email': string;
    'username': string;
    'role': string;
    'access': boolean;
    'password': string;
    'permissions': string[];
}