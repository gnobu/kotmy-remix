export type Status = 'registering' | 'ongoing' | 'completed'

export type Contest = {
    _id: string;
    image: string;
    title: string;
    tournamentId: string;
    contestId: string;
    status: Status;
}