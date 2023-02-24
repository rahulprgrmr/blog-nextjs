import formidable from "formidable";
import fs from "fs";

export async function saveFile(file: any) {
  console.log(process.env.NEXTAUTH_SECRET);
  //   const data = fs.readFileSync(file.);
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(
    `./public/images/posts/${file.newFilename}.${file.originalFilename
      .split(".")
      .pop()}`,
    data
  );
  await fs.unlinkSync(file.filepath);
  console.log(data);
  return `${process.env.BASE_URL}/images/posts/${
    file.newFilename
  }.${file.originalFilename.split(".").pop()}`;
}
