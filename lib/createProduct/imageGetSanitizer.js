function imageGetSanitizer(files) {
  let array = Array.from(files);

  if (array.length == 0) {
    array.push({
      orgName: files.originalFilename,
      newFileName: files.newFilename,
    });
    return array;
  }

  return array.map((img) => {
    return {
      orgName: img.originalFilename,
      newFileName: img.newFilename,
    };
  });
}
export default imageGetSanitizer;
