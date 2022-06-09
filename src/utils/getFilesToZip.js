const getFilesToZip = (files, parentFolder, parentPath) => {
  console.log({ getFilesToZip: { files, parentFolder, parentPath } });
  const zipFiles = [];
  files
    .filter((file) => parentFolder.children.includes(file.id))
    .forEach((file) => {
      const path = parentPath + "/" + file.name;
      if (file.fileType === "file") {
        const content = file.content;
        zipFiles.push({ path, content });
      } else {
        const directoryFiles = getFilesToZip(files, file, path);
        directoryFiles.forEach((file) => zipFiles.push(file));
      }
    });
  return zipFiles;
};

export default getFilesToZip;
