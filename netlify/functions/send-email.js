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
        const greetingText = isDe ? `Hallo <strong>${name}</strong>,` : `Hi <strong>${name}</strong>,`;
        const introText = isDe ? `Vielen Dank für Ihre Nachricht. Ich habe Ihre Anfrage erhalten und werde mich in Kürze bei Ihnen melden.<br><br>Ihre Nachricht:` : `Thank you for your message. I have received your inquiry and will get back to you shortly.<br><br>Your message:`;
        const signOffText = isDe ? `Beste Grüße,<br><strong>Julius Bruch</strong>` : `Best regards,<br><strong>Julius Bruch</strong>`;

        // WICHTIG: Die "from"-Adresse muss eine in Resend verifizierte Domain sein!
        // Beispiel: 'info@jb-solutions.digital'
        const emailData = {
            from: 'Julius Bruch <info@jb-solutions.digital>', 
            to: email, // Geht an die E-Mail des Nutzers, der das Formular ausgefüllt hat
            subject: subjectText,
            html: `
                <div style="font-family: Arial, sans-serif; font-size: 14px; line-height: 1.6; color: #333333; max-width: 600px; padding: 20px;">
                    <p>${greetingText}</p>
                    <p>${introText}</p>
                    <div style="margin: 20px 0; padding: 15px; border-left: 4px solid #01a9a4; background-color: #f9f9f9; color: #111111;">
                        ${message.replace(/\n/g, '<br>')}
                    </div>
                    <p>${signOffText}</p>
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