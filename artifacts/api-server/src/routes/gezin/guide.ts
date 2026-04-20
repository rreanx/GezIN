import { Router } from "express";
import { openai } from "@workspace/integrations-openai-ai-server";

const router = Router();

router.post("/api/gezin/guide", async (req, res) => {
  const { city } = req.body as { city?: string };
  if (!city || typeof city !== "string") {
    res.status(400).json({ error: "city is required" });
    return;
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  try {
    const stream = await openai.chat.completions.create({
      model: "gpt-5.2",
      max_completion_tokens: 8192,
      stream: true,
      messages: [
        {
          role: "system",
          content: `Sen GezIN uygulamasının yapay zeka seyahat rehberisin. Kullanıcılar sana bir Türk şehri söylediğinde, o şehir için samimi, pratik ve detaylı bir gezi rotası oluşturuyorsun. Cevapların her zaman Türkçe ve samimi bir dil ile yazılmalı — sanki bir arkadaş anlatıyormuş gibi. Emoji kullanabilirsin ama abartma. Markdown formatını kullan.`,
        },
        {
          role: "user",
          content: `${city} için 2 günlük bir gezi rotası oluştur. Her gün için: sabah, öğle ve akşam aktiviteleri, mutlaka yenilmesi gereken yemekler, yerel ipuçları ve pratik bilgiler ekle. Uygun format: ## 1. Gün / ## 2. Gün başlıkları, ### Sabah / ### Öğle / ### Akşam alt başlıkları, **Yemek Önerileri** ve **💡 Yerel İpuçları** bölümleri.`,
        },
      ],
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }

    res.write(`data: ${JSON.stringify({ done: true })}\n\n`);
    res.end();
  } catch (err) {
    req.log.error(err, "Travel guide generation failed");
    res.write(`data: ${JSON.stringify({ error: "Rota oluşturulamadı, lütfen tekrar dene." })}\n\n`);
    res.end();
  }
});

export default router;
