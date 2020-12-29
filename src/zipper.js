import JSZip from "jszip";
import { saveAs } from "file-saver";

const getFilesToZip = (files, parentFolder, parentPath) => {
  const zipFiles = [];
  files
    .filter(file => parentFolder.children.includes(file.id))
    .forEach(file => {
      const path = parentPath + "/" + file.name;
      if (file.fileType === "file") {
        const content = file.content;
        zipFiles.push({ path, content });
      } else {
        const directoryFiles = getFilesToZip(files, file, path);
        directoryFiles.forEach(file => zipFiles.push(file));
      }
    });
  return zipFiles;
};

const zipProjects = projects => {
  const filesToZip = [];
  projects.forEach(project => {
    const projectName = project.name;
    const files = project.files.filter(file => {
      if (file.fileType === "folder") return true;
      if (["js", "html", "css"].includes(file.name.split(".").pop())) {
        return true;
      }
      return false;
    });
    const root = files.filter(file => file.name === "root")[0];
    const projectFiles = getFilesToZip(files, root, projectName);
    projectFiles.forEach(file => filesToZip.push(file));
  });
  const zip = new JSZip();
  filesToZip.forEach(file => {
    zip.file(file.path, file.content);
  });
  const zipOptions = {
    type: "blob",
    compression: "DEFLATE",
    compressionOptions: {
      level: 3
    },
    platform: "DOS"
  };

  zip.generateAsync(zipOptions).then(content => {
    saveAs(content, "p5-projects.zip");
  });
};

export default zipProjects;
