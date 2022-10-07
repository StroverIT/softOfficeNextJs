function imageGetSanitizer(files) {
  let array = Array.from(files);
<<<<<<< HEAD
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
=======

  if (array.length == 0) {
    array.push({
      orgName: files.originalFilename,
      newFileName: files.newFilename,
    });
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
    return array;
  }

  return array.map((img) => {
    return {
<<<<<<< HEAD
      originalname: img.originalFilename,
=======
      orgName: img.originalFilename,
>>>>>>> d26f7cda55573513073816b1ede2bc730122a61e
      newFileName: img.newFilename,
    };
  });
}
export default imageGetSanitizer;
