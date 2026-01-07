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
export async function sendCompletionEmail(email: string, patientName: string, diagnosis: string, treatment?: string) {
  try {
    const data = await resend.emails.send({
      from: 'CareFlow <care@yourdomain.com>',
      to: [email],
      subject: 'Medical Session Completed - CareFlow',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #10b981;">Session Completed</h2>
          <p>Hello <strong>${patientName}</strong>,</p>
          <p>Your medical session has been completed and your records have been updated.</p>
          <div style="background: #f0fdf4; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #10b981;">
            <p style="margin: 0; margin-bottom: 8px;"><strong>Diagnosis:</strong> ${diagnosis}</p>
            ${treatment ? `<p style="margin: 0;"><strong>Treatment Plan:</strong> ${treatment}</p>` : ''}
          </div>
          <p>You can view your full medical history on your dashboard.</p>
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #666;">CareFlow - Your health, our priority.</p>
        </div>
      `,
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}

export async function sendInquiryEmail(email: string, details?: string) {
  try {
    const data = await resend.emails.send({
      from: 'CareFlow Demo <inquiry@yourdomain.com>',
      to: ['your-support-email@example.com'], // In a real app, this would be your support inbox
      subject: 'New Demo Request - CareFlow',
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #2563eb;">New Demo Inquiry</h2>
          <p>You have received a new request for a CareFlow demo.</p>
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;"><strong>Sender Email:</strong> ${email}</p>
            ${details ? `<p style="margin: 20px 0 0 0;"><strong>Details/Message:</strong><br/>${details}</p>` : ''}
          </div>
          <p style="font-size: 12px; color: #666;">This inquiry was sent from the CareFlow Landing Page.</p>
        </div>
      `,
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}

