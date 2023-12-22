export type Contest = {
    _id: string;
    image: string;
    title: string;
    tournamentId: string;
    contestId: string;
    status: 'registering' | 'ongoing' | 'completed';
}