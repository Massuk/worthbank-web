export interface Client {
    id: string;
    avatar?: string | null;
    background?: string | null;
    name: string;
    email: string;
    phoneNumbers?: {
        country: string;
        phoneNumber: string;
    }[];
    title?: string;
    company?: string;
    address?: string | null;
}

export interface Country {
    id: string;
    iso: string;
    name: string;
    code: string;
    flagImagePos: string;
}
