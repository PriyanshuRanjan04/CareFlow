"use server";

import { z } from "zod";
import { sendInquiryEmail } from "@/lib/resend";

const inquirySchema = z.object({
    email: z.string().email("Invalid email address"),
    message: z.string().optional(),
});

export async function handleInquiry(formData: FormData) {
    const email = formData.get("email") as string;
    const message = (formData.get("message") as string) || "";

    const result = inquirySchema.safeParse({ email, message });

    if (!result.success) {
        return { success: false, error: result.error.flatten().fieldErrors.email?.[0] || "Invalid input" };
    }

    try {
        const emailResult = await sendInquiryEmail(email, message);

        if (emailResult.success) {
            return { success: true, message: "Thank you! We'll be in touch soon." };
        } else {
            return { success: false, error: "Failed to send email. Please try again." };
        }
    } catch (error) {
        console.error("Inquiry error:", error);
        return { success: false, error: "An unexpected error occurred." };
    }
}
