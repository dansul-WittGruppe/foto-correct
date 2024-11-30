import { clearFolders, create } from "./input.js";
import fs from "fs"; // Import file system module

// clearFolders();
// await create();

const getIdsFromFolder = (folder) => {
  const files = fs.readdirSync(folder);
  return files.reduce((ids, file) => {
    const id = file.split(".")[0];
    ids.push(id);
    return ids;
  }, []);
};

const ids = getIdsFromFolder("in/calender");

const allFilesFromOriginalWithFolder = () => {
  return fs.readdirSync("in/original").reduce((acc, folder) => {
    const files = fs
      .readdirSync(`in/original/${folder}`)
      .map((file) => `in/original/${folder}/${file}`);
    return [...acc, ...files];
  }, []);
};

const orignalFiles = allFilesFromOriginalWithFolder("in/original");

const toCopy = ids.reduce((acc, id) => {
  const split = [...id.split("_")];
  if (split.length > 1) {
    acc.push(split[0]);
  } else {
    const original = orignalFiles.find((f) => f.includes(id));
    fs.copyFileSync(original, `out/${id}.jpeg`);
  }

  return acc;
}, []);

const copyFilesToOut = (files) => {
  files.forEach((file) => {
    const original = orignalFiles.find((f) => f.includes(file));
    fs.copyFileSync(original, `out/${file}.jpeg`);
  });
};

copyFilesToOut(toCopy);
