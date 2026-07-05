function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { nama, email, pesan } = req.body;

  if (!nama || !email || !pesan) {
    return res.status(400).json({ error: "Semua field wajib diisi" });
  }

  if (typeof nama !== "string" || nama.length > 100) {
    return res.status(400).json({ error: "Nama tidak valid (maks 100 karakter)" });
  }

  if (typeof email !== "string" || email.length > 200 || !isValidEmail(email)) {
    return res.status(400).json({ error: "Email tidak valid" });
  }

  if (typeof pesan !== "string" || pesan.length > 5000) {
    return res.status(400).json({ error: "Pesan terlalu panjang (maks 5000 karakter)" });
  }

  if (!process.env.SMTP_EMAIL || !process.env.SMTP_PASSWORD) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  const safeNama = escapeHtml(nama);
  const safeEmail = escapeHtml(email);
  const safePesan = escapeHtml(pesan);
  const safeEmailAttr = email.replace(/[^a-zA-Z0-9.@!$%&'*+\-/=?^_`{|}~]/g, "");

  const nodemailer = await import("nodemailer");

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"Form Kontak Beresin" <${process.env.SMTP_EMAIL}>`,
      to: process.env.SMTP_EMAIL,
      replyTo: safeEmailAttr,
      subject: `[Beresin] Pesan dari ${safeNama}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:24px;border-radius:12px 12px 0 0">
            <h1 style="color:#fff;margin:0;font-size:20px">Pesan Baru dari Beresin</h1>
          </div>
          <div style="background:#fff;border:1px solid #e5e7eb;padding:24px;border-radius:0 0 12px 12px">
            <table style="width:100%;border-collapse:collapse">
              <tr>
                <td style="padding:8px 12px;font-size:13px;color:#6b7280;width:80px">Nama</td>
                <td style="padding:8px 12px;font-size:14px;color:#111827;font-weight:600">${safeNama}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;font-size:13px;color:#6b7280">Email</td>
                <td style="padding:8px 12px;font-size:14px;color:#4f46e5">
                  <a href="mailto:${safeEmailAttr}" style="color:#4f46e5">${safeEmail}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 12px;font-size:13px;color:#6b7280;vertical-align:top">Pesan</td>
                <td style="padding:8px 12px;font-size:14px;color:#374151;white-space:pre-wrap">${safePesan}</td>
              </tr>
            </table>
          </div>
          <p style="text-align:center;font-size:11px;color:#9ca3af;margin-top:16px">
            Dikirim dari form kontak Beresin
          </p>
        </div>
      `,
    });

    res.status(200).json({ success: true, message: "Pesan berhasil dikirim!" });
  } catch {
    console.error("Email error");
    res.status(500).json({ error: "Gagal mengirim pesan. Coba lagi nanti." });
  }
}
