import { useEffect, useState } from "react";

import { getEvent } from "api";
import { Event } from "models";

export const useEvent = (eventId: string) => {
    const [event, setEvent] = useState<Event | null>();
    const [isEventLoading, setIsEventLoading] = useState(false);

    useEffect(() => {
        (async function () {
            setIsEventLoading(true);
            const event = await getEvent(eventId)
            setEvent(event);
            setIsEventLoading(false);
        })()
    }, [eventId]);

    return { event, isEventLoading };
}