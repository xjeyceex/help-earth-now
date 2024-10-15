import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { feedback } = await request.json();

  if (!feedback) {
    return NextResponse.json({ message: "Feedback is required" }, { status: 400 });
  }

  try {
    const recipients = [
      'feedback@helpearthnow.org',
      'jcmiguel.beltran@gmail.com',
    ];

    // Create transporter for sending emails anonymously
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // or any other email service provider
      auth: {
        user: process.env.EMAIL_USER, // your email for sending
        pass: process.env.EMAIL_PASS, // your email password
      },
    });

    // Send feedback email with a generic "no-reply" sender
    await transporter.sendMail({
      from: 'no-reply@helpearthnow.org', // Set this to something like no-reply
      to: recipients.join(', '), // Send to all recipients
      subject: 'Feedback', // Email subject
      text: `${feedback}`, // Email body with the feedback content
    });

    return NextResponse.json({ message: 'Feedback sent successfully' });
  } catch (error) {
    console.error('Error sending feedback:', error);
    return NextResponse.json({ message: 'Error sending feedback' }, { status: 500 });
  }
}
