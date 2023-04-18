
import { mockedInvites } from "models";
import { ClosedInviteCard } from "./components/ClosedInviteCard/ClosedInviteCard";

import styles from "./ClosedInvites.module.scss";


export function ClosedInvites() {
    return (
        <ul className={styles.closedInvites}>
            {mockedInvites.map(i => (
                <ClosedInviteCard
                    invite={i}
                />
            ))}
        </ul>
    );
}