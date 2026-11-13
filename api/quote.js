/**
 * Vercel Serverless Function: /api/quote
 * Handles:
 * 1. Validation and sanitization of incoming quote requests & contact messages
 * 2. Dispatching alert email to sales team via Resend API
 */

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method not allowed. Use POST." });
  }

  try {
    const { name, email, phone, company, sector, product, quantity, message } = req.body || {};

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: Name, Email, and Message are required."
      });
    }

    const quoteId = "QUO-" + Date.now().toString(36).toUpperCase();
    const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });

    const lead = {
      quoteId,
      timestamp,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : "Not provided",
      company: company ? String(company).trim() : "Not provided",
      sector: sector ? String(sector).trim() : "General Website Inquiry",
      product: product ? String(product).trim() : "General Consultation",
      quantity: quantity ? String(quantity).trim() : "Not specified",
      message: String(message).trim()
    };

    console.log(`[LEAD RECEIVED] ${quoteId}:`, JSON.stringify(lead));

    const resendApiKey = process.env.RESEND_API_KEY;

    if (resendApiKey) {
      const emailHtml = `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; background: #ffffff;">
          <div style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%); color: #ffffff; padding: 24px; text-align: center;">
            <h2 style="margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">New Website Inquiry [${quoteId}]</h2>
            <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">Balaras Innovations Customer Portal</p>
          </div>
          <div style="padding: 24px; color: #1e293b; font-size: 15px; line-height: 1.6;">
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: 600; color: #64748b; width: 140px;">Customer Name:</td><td style="padding: 10px 0; font-weight: 700; color: #0f172a;">${lead.name}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: 600; color: #64748b;">Email Address:</td><td style="padding: 10px 0;"><a href="mailto:${lead.email}" style="color: #0284c7; text-decoration: none; font-weight: 600;">${lead.email}</a></td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: 600; color: #64748b;">Phone Number:</td><td style="padding: 10px 0;"><a href="tel:${lead.phone}" style="color: #0f172a; text-decoration: none;">${lead.phone}</a></td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: 600; color: #64748b;">Company:</td><td style="padding: 10px 0; color: #0f172a;">${lead.company}</td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: 600; color: #64748b;">Sector / Interest:</td><td style="padding: 10px 0;"><span style="background: #e0f2fe; color: #0369a1; padding: 4px 10px; border-radius: 9999px; font-size: 13px; font-weight: 600;">${lead.sector}</span></td></tr>
              <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 10px 0; font-weight: 600; color: #64748b;">Product / Subject:</td><td style="padding: 10px 0; font-weight: 700; color: #0f172a;">${lead.product}</td></tr>
              <tr><td style="padding: 10px 0; font-weight: 600; color: #64748b;">Estimated Qty:</td><td style="padding: 10px 0; color: #0f172a;">${lead.quantity}</td></tr>
            </table>

            <div style="background-color: #f8fafc; border-left: 4px solid #0284c7; padding: 16px; border-radius: 4px; margin-top: 10px;">
              <div style="font-weight: 700; color: #0f172a; margin-bottom: 6px;">Customer Requirements / Message:</div>
              <div style="color: #334155; white-space: pre-wrap; font-size: 14px;">${lead.message}</div>
            </div>

            <p style="margin-top: 24px; font-size: 12px; color: #94a3b8; text-align: center;">Submitted on ${timestamp} IST &bull; Balaras Innovations Platform</p>
          </div>
        </div>
      `;

      const sendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey.trim()}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "Balaras Website <onboarding@resend.dev>",
          to: ["info@balaras.in"],
          subject: `[Lead] ${lead.product} - ${lead.name}`,
          html: emailHtml
        })
      });

      const resData = await sendRes.json().catch(() => null);
      console.log(`[RESEND STATUS ${sendRes.status}]:`, resData);
    }

    return res.status(200).json({
      success: true,
      message: "Inquiry submitted successfully. Our team will contact you shortly.",
      quoteId
    });

  } catch (error) {
    console.error("Quote API Error:", error);
    return res.status(500).json({
      success: false,
      error: "Internal server error processing quote request."
    });
  }
};
