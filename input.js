import { Jimp } from "jimp"; // Import Jimp
import { v4 as uuidv4 } from "uuid"; // Import UUID v4 generator
import fs from "fs"; // Import file system module

export const clearFolders = () => {
  //clear the output folder
  fs.rmdirSync("in", { recursive: true });
  fs.mkdirSync("in");
  fs.mkdirSync("in/original");
  fs.mkdirSync("in/copied");
  fs.rmdirSync("out", { recursive: true });
  fs.mkdirSync("out");
};

// Function to generate 10 IDs with the specified pattern
function generateIds(count) {
  const ids = [];
  for (let i = 0; i < count; i++) {
    const id = `${uuidv4()}`; // Generate a UUID and append .jpeg
    ids.push(id);
  }
  return ids;
}

// Function to create images with the generated IDs
async function createImages(ids) {
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i];
    try {
      const image = new Jimp({ width: 500, height: 500, color: 0xff0000ff }); // Create a red image (500x500 pixels)
      await image.write(`in/original/${id}.jpeg`); // Save the image with the generated ID
      if (i % 2 === 0) {
        await image.write(`in/kalender/${id}_105_c.jpeg`);
      } else {
        await image.write(`in/kalender/${id}.jpeg`);
      }
    } catch (error) {
      console.error(`Error creating file: ${id}`, error);
    }
  }
}

// Generate 10 IDs
const ids = generateIds(10);

// Create images with the generated IDs
//createImages(ids);

export const create = () => createImages(ids);
