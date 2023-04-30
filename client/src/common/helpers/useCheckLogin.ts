import { checkLogin } from "api";
import { useEffect, useState } from "react";

export const useCheckLogin = (login: string | undefined, shouldValidate: boolean) => {
    const [isLoginExist, setIsLoginExist] = useState(false);

    useEffect(() => {
        if (!login || !shouldValidate) {
            return;
        }

        (async () => {
            const result = await checkLogin(login);

            setIsLoginExist(result);
        })();
    }, [login, shouldValidate])

    return isLoginExist;
}