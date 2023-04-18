import { mockedInvites } from "models";

import { UserResponseCard } from "./components/UserResponseCard/UserResponseCard";

import styles from './UserResponses.module.scss';

export function UserResponses() {
    return (
        <div className={styles.userResponses}>
            {mockedInvites.map(i => (
                <UserResponseCard invite={i} />
            ))}
        </div>
    );
}