export default function handler(req, res) {
    res.status(200).json({
      hadith: "The best of you are those who are best to their families.",
      source: "Sahih Bukhari",
    });
  }
  