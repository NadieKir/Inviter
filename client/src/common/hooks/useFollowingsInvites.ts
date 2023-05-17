import { useEffect, useState } from "react";
import { Invite } from "models";
import { getFollowingsInvites } from "api";

export const useFollowingsInvites = () => {
    const [followingInvites, setFollowingInvites] = useState<Invite[] | null>();
    const [isFollowingsLoading, setIsFollowingLoading] = useState(false);

    useEffect(() => {
        (async function () {
            setIsFollowingLoading(true);
            const invites = await getFollowingsInvites()
            setFollowingInvites(invites);
            setIsFollowingLoading(false);
        })()
    }, []);

    return { followingInvites, isFollowingsLoading };
}