import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default resend;

export async function sendAppointmentEmail(email: string, patientName: string, date: string, time: string) {
  try {
    const data = await resend.emails.send({
      from: 'CareFlow <appointments@yourdomain.com>',
      to: [email],
      subject: 'Appointment Confirmation - CareFlow',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">Appointment Confirmed</h2>
          <p>Hello <strong>${patientName}</strong>,</p>
          <p>Your appointment has been successfully scheduled.</p>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Date:</strong> ${date}</p>
            <p style="margin: 0;"><strong>Time:</strong> ${time}</p>
          </div>
          <p>If you need to reschedule, please log in to your dashboard.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666;">CareFlow - Helping you stay healthy.</p>
        </div>
      `,
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
