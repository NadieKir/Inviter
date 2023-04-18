
import { mockedInvites } from "models";
import { CurrentInviteCard } from "./components/CurrentInviteCard/CurrentInviteCard";

import styles from "./CurrentInvites.module.scss";


export function CurrentInvites() {
    return (
        <ul className={styles.currentInvites}>
            {mockedInvites.map(i => (
                <CurrentInviteCard
                    invite={i}
                />
            ))}
        </ul>
    );
}