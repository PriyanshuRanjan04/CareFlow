"use client";

import { useEffect } from "react";
import { syncUser } from "@/app/actions/user";

export function SyncUser() {
    useEffect(() => {
        const sync = async () => {
            try {
                await syncUser();
            } catch (error) {
                console.error("Failed to sync user:", error);
            }
        };
        sync();
    }, []);

    return null;
}
