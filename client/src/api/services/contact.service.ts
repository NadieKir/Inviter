import { httpClient } from 'api/httpClient';
import { User } from 'models';

export const getContacts = async () => {
    const { data: contacts } = await httpClient.get<User[]>(`/contacts`);

    return contacts;
}

export const getAnotherUserContacts = async (id: string) => {
    const { data: contacts } = await httpClient.get<User[]>(`/contacts/${id}`);

    return contacts;
}