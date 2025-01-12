import Groq from 'groq-sdk';

// Inicializa el cliente con tu clave API
const groq = new Groq({ apiKey: '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' });

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const input = req.body.question;
      const promptHistory = [{ role: "user", content: input }];
      
      const response = await groq.chat.completions.create({
        messages: promptHistory,
        model: "llama-3.3-70b-versatile",
      });

      const iaResponse = response.choices[0]?.message?.content || "No se recibió respuesta de la IA.";
      
      res.status(200).json({ answer: iaResponse });
    } catch (error) {
      console.error('Error en la IA:', error);
      res.status(500).json({ error: 'Error al contactar con la IA.' });
    }
  } else {
    res.status(405).json({ error: 'Método no permitido' });
  }
}