import Groq from "groq-sdk";

// Tu clave API
const apiKey = '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';

const groq = new Groq({ apiKey });

export async function preguntarIA(pregunta) {
    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: "user", content: pregunta }
            ],
            model: "llama-3.3-70b-versatile"
        });

        return chatCompletion.choices[0]?.message?.content || 'No se recibió respuesta';
    } catch (error) {
        console.error('Error al hacer la solicitud:', error);
        return 'Hubo un error al obtener la respuesta.';
    }
}