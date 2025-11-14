import { readFile, writeFile } from "fs/promises";
import path from "path";

export default async function saveFile(params, typeofsave) {

  let filePath;

  if (typeofsave == 'room'){
    filePath = path.resolve("./data", "hotel.json");
  }
  
  if (typeofsave == 'user'){
    filePath = path.resolve("./data", "clients.json");
  }

  try {

    const fileContent = await readFile(filePath, "utf-8");
    let input = []

    if (fileContent.trim().length > 0) {
      input = JSON.parse(fileContent);
    }

    const index = input['rooms'].findIndex(u => u.id === params['id']);


    if (index !== -1) {
      input['rooms'][index] = params
    } else {
      input.push(params);
    }
    //console.log(params)

    await writeFile(filePath, JSON.stringify(input, null, 2), "utf-8");

    console.log("Opération effectuée avec succès !");
    return true;

  } catch (error) {
    
    // Si le fichier n’existe pas encore, on le crée
    if (error.code === "ENOENT") {
      await writeFile(filePath, JSON.stringify([newReservation], null, 2), "utf-8");
      console.log("Fichier créé et première réservation enregistrée !");
      return true;
    }

    console.error("Erreur lors de l'ajout :", error.message);
    return false;
  }
}
