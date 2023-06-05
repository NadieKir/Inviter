import { httpClient } from 'api/httpClient';
import { User } from 'models';
import { buildQueryParams } from './helpers';

export const getContacts = async () => {
    const { data: contacts } = await httpClient.get<User[]>(`/contacts`);

    return contacts;
}

export const getAnotherUserContacts = async (id: string) => {
    const { data: contacts } = await httpClient.get<User[]>(`/contacts/${id}`);

    return contacts;
}

export const deleteContact = async (id: string, shouldDeleteFromAll: string) => {
    const filters = {id, shouldDeleteFromAll};
    const filtersQueryParams = buildQueryParams(filters);

    const { data: message } = await httpClient.delete<string>(`/contacts/${id}${filtersQueryParams}`);

    return message;
}