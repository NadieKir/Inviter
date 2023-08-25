import { useContext, useEffect, useState } from "react"

import { Invite, User } from "models";
import { UserContext } from "common/contexts";

export const useContactsInvites = (filter?: string) => {
    const { userInvites, loadContacts } = useContext(UserContext);
    const [contactsInvites, setContactsInvites] = useState<Map<User, Invite[]>>();
    const [isLoading, setIsLoading] = useState(false);

    const loadContactInvites = async () => {
        setIsLoading(true);

        const contacts = await loadContacts();

        const filteredContacts = contacts.filter(c =>
            c.name.toLowerCase().includes((filter ?? '').toLowerCase()) ||
            c.login.toLowerCase().includes((filter ?? '').toLowerCase()));

        const contactsWithInvites = filteredContacts.reduce((acc, c) => {
            const contactInvites = userInvites.filter(i => i.creator._id === c._id || i.companions.map(c => c._id).includes(c._id))

            acc.set(c, contactInvites);

            return acc;
        }, new Map<User, Invite[]>())


        setIsLoading(false);
        setContactsInvites(contactsWithInvites ?? []);
    };

    useEffect(() => {
        loadContactInvites()
    }, [userInvites, filter])

    return { contactsInvites, isLoading, loadContactInvites };
}