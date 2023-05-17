import { httpClient } from 'api/httpClient';
import { Following, Invite, User } from 'models';

export const addFollowing = async (followingUserId: string) => {
    const { data: following } = await httpClient.post<Following>(`/followings`, {
        followingUserId
    });

    return following;
}

export const removeFollowing = async (followingUserId: string) => {
    await httpClient.delete<void>(`/followings`, {
        data: {
            followingUserId
        }
    });
}

export const getFollowings = async () => {
    const { data: followings } = await httpClient.get<User[]>(`/followings`);

    return followings;
}

export const getFollowingsInvites = async () => {
    const { data: invites } = await httpClient.get<Invite[]>(`/followings/invites`);

    return invites;
}