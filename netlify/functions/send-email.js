exports.handler = async function(event) {
    // Nur POST-Requests zulassen
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { name, email, message, lang } = JSON.parse(event.body);
        
        if (!name || !email || !message) {
            return { statusCode: 400, body: JSON.stringify({ error: 'Missing required fields' }) };
        }

        const apiKey = process.env.RESEND_API_KEY;

        // Determine the language (default to English)
        const isDe = lang === 'de';
        
        const subjectText = isDe ? `Vielen Dank für Ihre Nachricht, ${name}!` : `Thank you for your message, ${name}!`;
        const titleText = isDe ? `Nachricht erhalten` : `Message Received`;
        const greetingText = isDe ? `Hallo <strong>${name}</strong>,` : `Hi <strong>${name}</strong>,`;
        const introText = isDe ? `Vielen Dank für Ihre Kontaktaufnahme. Ich habe Ihre Anfrage erhalten und werde mich so schnell wie möglich bei Ihnen melden. Hier ist eine Kopie Ihrer Nachricht:` : `Thank you for getting in touch. I have received your inquiry and will get back to you as soon as possible. Here is a copy of your message:`;
        const signOffText = isDe ? `Viele Grüße,<br><strong style="color: #6A0DAD;">Julius Bruch</strong><br>Digital Solutions` : `Best regards,<br><strong style="color: #6A0DAD;">Julius Bruch</strong><br>Digital Solutions`;

        // WICHTIG: Die "from"-Adresse muss eine in Resend verifizierte Domain sein!
        // Beispiel: 'info@jb-solutions.digital'
        const emailData = {
            from: 'Julius Bruch <info@jb-solutions.digital>', 
            to: email, // Geht an die E-Mail des Nutzers, der das Formular ausgefüllt hat
            subject: subjectText,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333333; background-color: #ffffff; padding: 30px 20px; margin: 0;">
                    <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 0; overflow: hidden; border: 1px solid #e0e0e0;">
                        <div style="background-color: #000000; color: #ffffff; padding: 20px 30px; text-align: center;">
                            <h2 style="margin: 0; font-weight: 500; letter-spacing: 0.5px;">${titleText}</h2>
                        </div>
                        <div style="padding: 30px;">
                            <p style="margin-top: 0; font-size: 16px;">${greetingText}</p>
                            <p style="font-size: 16px;">${introText}</p>
                            
                            <blockquote style="margin: 25px 0; padding: 15px 20px; background-color: #f5f5f5; border-left: 4px solid #000000; color: #333333; border-radius: 0; font-style: italic;">
                                ${message.replace(/\n/g, '<br>')}
                            </blockquote>
                            
                            <p style="margin-bottom: 0; font-size: 16px;">${signOffText.replace(/#6A0DAD/g, '#000000')}</p>
                        </div>
                        <div style="background-color: #ffffff; padding: 15px 30px; text-align: center; color: #555555; font-size: 12px; border-top: 1px solid #e0e0e0;">
                            &copy; ${new Date().getFullYear()} Julius Bruch Digital Solutions.
                        </div>
                    </div>
                </div>
            `
        };

        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(emailData)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error("Resend API error:", errorText);
            return { statusCode: response.status, body: JSON.stringify({ error: 'Failed to send via Resend' }) };
        }

        return { statusCode: 200, body: JSON.stringify({ success: true, message: 'Email sent successfully!' }) };
        
    } catch (error) {
        console.error('Function error:', error);
        return { statusCode: 500, body: JSON.stringify({ error: 'Internal Server Error' }) };
    }
};