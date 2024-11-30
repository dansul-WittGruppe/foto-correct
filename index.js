import { clearFolders, create } from "./input.js";
import fs from "fs"; // Import file system module

clearFolders();
await create();

const getIdsFromFolder = (folder) => {
  const files = fs.readdirSync(folder);
  return files.reduce((ids, file) => {
    const id = file.split(".")[0];
    ids.push(id);
    return ids;
  }, []);
};

const ids = getIdsFromFolder("in/copied");

const toCopy = ids.reduce((acc, id) => {
  const split = [...id.split("_")];
  if (split.length > 1) {
    acc.push(split[0]);
  }
  return acc;
}, []);

const copyFilesToOut = (files) => {
  files.forEach((file) => {
    fs.copyFileSync(`in/original/${file}.jpeg`, `out/${file}.jpeg`);
  });
};

copyFilesToOut(toCopy);
