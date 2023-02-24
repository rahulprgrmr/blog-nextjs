const bcrypt = require("bcrypt");

export default class Hash {
  static async make(text: string, salt: number = 12) {
    return await bcrypt.hash(text, salt);
  }

  static async compare(unHashText: string, hashedText: string) {
    return await bcrypt.compare(unHashText, hashedText);
  }
}
