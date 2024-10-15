import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  const { feedback } = await request.json();

  if (!feedback) {
    return NextResponse.json({ message: 'Feedback is required' }, { status: 400 });
  }

  try {
    const recipients = [
      'feedback@helpearthnow.org',
      'jcmiguel.beltran@gmail.com',
    ];

    // Create a transporter object using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // or any other email service provider
      auth: {
        user: process.env.EMAIL_USER, // Sender email
        pass: process.env.EMAIL_PASS, // Sender email password
      },
    });

    // Send the feedback email
    await transporter.sendMail({
      from: '"Help Earth Now" <no-reply@helpearthnow.org>', // Improved sender format
      to: recipients, // Recipients array
      subject: '🌍 New Feedback Received', // Add an engaging subject
      html: `
        <h3>You've received new feedback:</h3>
        <p>${feedback}</p>
        <br/>
        <p style="font-size: 0.9em;">This message was sent anonymously via Help Earth Now's feedback system.</p>
      `, // Use HTML for better formatting
    });

    return NextResponse.json({ message: 'Feedback sent successfully!' });
  } catch (error) {
    console.error('Error sending feedback:', error);
    return NextResponse.json({ message: 'Error sending feedback' }, { status: 500 });
  }
}
