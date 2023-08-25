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

export const getFollowers = async () => {
    const { data: followers } = await httpClient.get<User[]>(`/followings/followers`);

    return followers;
}

export const getAnotherUserFollowings = async (id: string) => {
    const { data: followings } = await httpClient.get<User[]>(`/followings/${id}`);

    return followings;
}

export const getAnotherUserFollowers = async (id: string) => {
    const { data: followers } = await httpClient.get<User[]>(`/followings/followers/${id}`);

    return followers;
}

export const getFollowingsInvites = async () => {
    const { data: invites } = await httpClient.get<Invite[]>(`/followings/invites`);

    return invites;
}