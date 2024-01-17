export type TallyTransaction = {
    tx_ref: string;
    sender: string;
    code: string;
    votes: number;
    amount: number;
    fee: number;
    date: string;
    status: 'pending' | 'verified' | 'revoked';
}

export type IncomeSummary = {
    contest: string;
    description: string;
    session: string;
    paystack: number;
    bank: number;
}

export type RegistrationTableData = {
    tx_ref: string;
    contest: string;
    contestant: string;
    sender: string;
    amount: number;
    date: string;
    status: 'pending' | 'verified' | 'revoked';
}