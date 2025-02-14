import fs from 'fs';
import { Logger } from '../../utils/logger';
function isBoolean(value: any) {
  if (value == undefined || value == null) return false;
  return ["true", "false"].includes(value.toString().toLowerCase());
}

function toBoolean(value: any) {
    return value && value.toString().toLowerCase() === "true"
}

export const TypesMethods = {
    isBoolean,
    toBoolean
};


export const FSMethods = {
  ensureFolderExist(path: string, createIfNotExist: boolean = true) {
    const isExist = fs.existsSync(path);
    if (!isExist && createIfNotExist) {
      try {
        fs.mkdirSync(path, {recursive: true})
      return true;
      } catch(err) {
        Logger.error(err)
        return false;
      }
    }
    return isExist
  }
}
