import JSZip from "jszip";
import { saveAs } from "file-saver";
import getFilesToZip from "./getFilesToZip";

const getZip = (projects, filetypes) => {
  const filesToZip = [];
  projects.forEach((project) => {
    const projectName = project.name;
    const files = project.files.filter((file) => {
      if (file.fileType === "folder") return true;
      if (filetypes.split(",").map(name=>name.replace('.','').trim()).includes(file.name.split(".").pop())) {
        return true;
      }
      return false;
    });
    const root = files.filter((file) => file.name === "root")[0];
    const projectFiles = getFilesToZip(files, root, projectName);
    projectFiles.forEach((file) => filesToZip.push(file));
  });
  const zip = new JSZip();
  filesToZip.forEach((file) => {
    zip.file(file.path, file.content);
  });
  const zipOptions = {
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: {
      level: 3,
    },
    platform: "DOS",
  };

  zip.generateAsync(zipOptions).then((content) => {
    saveAs(content, "p5-projects.zip");
  });
};

export default getZip;
