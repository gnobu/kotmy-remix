export type TallyTransaction = {
    tx_ref: string,
    sender: string,
    code: string,
    votes: number,
    amount: number,
    fee: number,
    date: string,
    status: 'pending' | 'verified' | 'revoked',
}