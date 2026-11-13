/**
 * Vercel Serverless Function: /api/quote
 * Handles validation and dispatching of quote requests
 */

module.exports = async (req, res) => {
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

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields: Name, Email, and Message are required."
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, error: "Invalid email address format." });
    }

    const quoteId = "QUO-" + Date.now().toString(36).toUpperCase();
    const timestamp = new Date().toISOString();

    const quoteRecord = {
      quoteId,
      timestamp,
      name: String(name).trim(),
      email: String(email).trim().toLowerCase(),
      phone: phone ? String(phone).trim() : "Not provided",
      company: company ? String(company).trim() : "Not provided",
      sector: sector ? String(sector).trim() : "General Inquiry",
      product: product ? String(product).trim() : "Not specified",
      quantity: quantity ? String(quantity).trim() : "Not specified",
      message: String(message).trim()
    };

    const resendApiKey = process.env.RESEND_API_KEY;
    const salesEmail = process.env.SALES_EMAIL || "vasu@balaras.in, info@balaras.in";

    if (resendApiKey) {
      const emailHtml = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #0284c7; color: #ffffff; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-size: 22px;">New Quote Request [${quoteId}]</h2>
            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.9;">Balaras Innovations Quote Backend</p>
          </div>
          <div style="padding: 24px; color: #374151; font-size: 15px; line-height: 1.6;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px 0; font-weight: bold; width: 140px;">Customer Name:</td><td>${quoteRecord.name}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td><a href="mailto:${quoteRecord.email}">${quoteRecord.email}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Phone:</td><td><a href="tel:${quoteRecord.phone}">${quoteRecord.phone}</a></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Company:</td><td>${quoteRecord.company}</td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Sector:</td><td><span style="background: #e0f2fe; color: #0369a1; padding: 3px 8px; border-radius: 4px; font-size: 13px;">${quoteRecord.sector}</span></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Product:</td><td><strong>${quoteRecord.product}</strong></td></tr>
              <tr><td style="padding: 8px 0; font-weight: bold;">Estimated Qty:</td><td>${quoteRecord.quantity}</td></tr>
            </table>
            <div style="margin-top: 16px; padding: 12px; background-color: #f9fafb; border-left: 4px solid #0284c7; border-radius: 4px;">
              <strong>Project Requirements / Message:</strong>
              <p style="margin: 8px 0 0 0; white-space: pre-wrap;">${quoteRecord.message}</p>
            </div>
            <p style="margin-top: 20px; font-size: 12px; color: #9ca3af; text-align: center;">Received on ${new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })} IST</p>
          </div>
        </div>
      `;

      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${resendApiKey}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "Balaras Website <onboarding@resend.dev>",
          to: salesEmail.split(",").map(e => e.trim()),
          subject: `Quote Request: ${quoteRecord.product || quoteRecord.sector} - ${quoteRecord.name}`,
          html: emailHtml
        })
      });
    }

    return res.status(200).json({
      success: true,
      message: "Quote request submitted successfully. Our team will contact you shortly.",
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
