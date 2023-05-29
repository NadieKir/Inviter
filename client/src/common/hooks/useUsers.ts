import { useEffect, useState } from "react";

import { User } from "models";
import { getUsers } from "api";

export const useUsers = (nameOrLogin?: string) => {
    const [users, setUsers] = useState<User[]>([]);
    const [isUsersLoading, setIsUsersLoading] = useState(false);

    useEffect(() => {
        if (!nameOrLogin) {
            setUsers([]);
            return;
        }

        (async () => {
            setIsUsersLoading(true);
            const invites = await getUsers(nameOrLogin)
            setUsers(invites);
            setIsUsersLoading(false);
        })()
    }, [nameOrLogin]);

    return { users, isUsersLoading };
}