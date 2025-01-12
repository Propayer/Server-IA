import Groq from "groq-sdk";

// Inicializa el cliente con tu clave API
const groq = new Groq({ apiKey: "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" });

async function preguntarIA(pregunta) {
  const promptHistory = []; // Historial de la conversación

  try {
    // Agrega la pregunta del usuario al historial
    promptHistory.push({ role: "user", content: pregunta });

    const response = await groq.chat.completions.create({
      messages: promptHistory,
      model: "llama-3.3-70b-versatile",
    });

    const iaResponse = response.choices[0]?.message?.content || "No se recibió respuesta de la IA.";
    
    // Mostrar la respuesta de la IA en la UI
    document.getElementById('response').innerText = iaResponse;
  } catch (error) {
    console.error("Error al interactuar con la IA:", error);
    document.getElementById('response').innerText = 'Hubo un error al obtener la respuesta.';
  }
}

// Función para manejar el clic en el botón "Preguntar"
document.getElementById('askButton').addEventListener('click', async () => {
  const pregunta = document.getElementById('question').value.trim(); // Obtener la pregunta
  if (!pregunta) {
    alert('Por favor, escribe una pregunta.');
    return;
  }

  // Llamada a la función para obtener la respuesta de la IA
  await preguntarIA(pregunta);
});