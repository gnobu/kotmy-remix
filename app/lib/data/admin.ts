import { AdminUser } from "../types/user.interface"

const role3 = ['edit_blog']
const role2 = [...role3, 'edit_content']
const role1 = [...role2, 'manage_users']

export const adminUsers: AdminUser[] = [
    {
        'id': '1', 'full_name': 'Admin', 'email': 'admin@gmail.com',
        'username': 'admin', 'role': 'Role 1', 'access': true,
        'password': 'a12345A!', 'permissions': role1
    },
    {
        'id': '2', 'full_name': 'Nicole Clems', 'email': 'nicole@gmail.com',
        'username': 'nicole', 'role': 'Role 2', 'access': false,
        'password': 'a12345A!', 'permissions': role2
    },
    {
        'id': '3', 'full_name': 'Favour Wagor', 'email': 'favour@gmail.com',
        'username': 'favour', 'role': 'Role 2', 'access': true,
        'password': 'a12345A!', 'permissions': role2
    },
    {
        'id': '4', 'full_name': 'Oluchi Chinedu', 'email': 'chinedu@gmail.com',
        'username': 'Oluchi', 'role': 'Role 3', 'access': false,
        'password': 'a12345A!', 'permissions': role3
    },
    {
        'id': '5', 'full_name': 'Augustine Best', 'email': 'lilklara@gmail.com',
        'username': 'lilklara', 'role': 'Role 3', 'access': true,
        'password': 'a12345A!', 'permissions': role3
    },
    {
        'id': '6', 'full_name': 'Davidking Blossom', 'email': 'blossomdavid@gmail.com',
        'username': 'davidking', 'role': 'Role 3', 'access': false,
        'password': 'a12345A!', 'permissions': role3
    },
]

export const permissions = ['manage_users', 'edit_content', 'edit_blog']