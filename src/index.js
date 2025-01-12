import readline from "readline";
import Groq from "groq-sdk";

// Inicializa el cliente con tu clave API
const groq = new Groq({ apiKey: "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" });

async function main() {
  console.log("Bienvenido a la conversación con la IA. Escribe 'salir' para finalizar.\n");

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const promptHistory = []; // Historial de la conversación

  rl.on("line", async (input) => {
    if (input.toLowerCase() === "salir") {
      console.log("¡Adiós!");
      rl.close();
      return;
    }

    try {
      // Agrega la pregunta del usuario al historial
      promptHistory.push({ role: "user", content: input });

      const response = await groq.chat.completions.create({
        messages: promptHistory,
        model: "llama-3.3-70b-versatile",
      });

      const iaResponse = response.choices[0]?.message?.content || "No se recibió respuesta de la IA.";
      console.log(`IA: ${iaResponse}`);

      // Agrega la respuesta de la IA al historial
      promptHistory.push({ role: "assistant", content: iaResponse });
    } catch (error) {
      console.error("Error al interactuar con la IA:", error);
    }

    console.log("\nTú:");
  });
}

main().catch((error) => {
  console.error("Hubo un error al iniciar el programa:", error);
});