function imageGetSanitizer(files) {
  let array = Array.from(files);
  if (array.length == 0) {
    array.push({
      originalname: files.originalFilename,
      newFileName: files.newFilename,
    });
    // This is how it works
    // array.push({
    //   orgName: files.originalFilename,
    //   newFileName: files.newFilename,
    // });
    return array;
  }

  return array.map((img) => {
    return {
      originalname: img.originalFilename,
      newFileName: img.newFilename,
    };
  });
}
export default imageGetSanitizer;
