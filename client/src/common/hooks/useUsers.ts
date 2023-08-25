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
            const users = await getUsers(nameOrLogin)
            setUsers(users.filter(user => !user.isDeleted));
            setIsUsersLoading(false);
        })()
    }, [nameOrLogin]);

    return { users, isUsersLoading };
}