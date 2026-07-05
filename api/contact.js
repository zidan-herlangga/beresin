export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { nama, email, pesan } = req.body;

  if (!nama || !email || !pesan) {
    return res.status(400).json({ error: "Semua field wajib diisi" });
  }

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
      replyTo: email,
      subject: `[Beresin] Pesan dari ${nama}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:linear-gradient(135deg,#4f46e5,#7c3aed);padding:24px;border-radius:12px 12px 0 0">
            <h1 style="color:#fff;margin:0;font-size:20px">Pesan Baru dari Beresin</h1>
          </div>
          <div style="background:#fff;border:1px solid #e5e7eb;padding:24px;border-radius:0 0 12px 12px">
            <table style="width:100%;border-collapse:collapse">
              <tr>
                <td style="padding:8px 12px;font-size:13px;color:#6b7280;width:80px">Nama</td>
                <td style="padding:8px 12px;font-size:14px;color:#111827;font-weight:600">${nama}</td>
              </tr>
              <tr>
                <td style="padding:8px 12px;font-size:13px;color:#6b7280">Email</td>
                <td style="padding:8px 12px;font-size:14px;color:#4f46e5">
                  <a href="mailto:${email}" style="color:#4f46e5">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding:8px 12px;font-size:13px;color:#6b7280;vertical-align:top">Pesan</td>
                <td style="padding:8px 12px;font-size:14px;color:#374151;white-space:pre-wrap">${pesan}</td>
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
  } catch (err) {
    console.error("Email error:", err);
    res.status(500).json({ error: "Gagal mengirim pesan. Coba lagi nanti.", detail: err.message });
  }
}
