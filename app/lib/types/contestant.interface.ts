export type Contestant = {
    id: string | number;
    fullName: string;
    email: string;
    age?: number;
    dob: string;
    gender: string;
    state_of_residence: string;
    image: string;
    votes: {
        social_media: {
            type: 'facebook' | 'instagram' | 'twitter';
            count: number;
            url: string
        };
        tally: number;
        givah: number;
    }
}