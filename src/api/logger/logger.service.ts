import { ConsoleLogger, Injectable, Logger } from '@nestjs/common';
import { promises as fsPromises } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

const separator = path.sep;
dotenv.config();
const logLevel = +process.env.LOG_LEVEL;
const maxFileSize = +process.env.MAX_FILE_SIZE;

@Injectable()
export class LoggingService extends ConsoleLogger {
  private readonly logger = new Logger('LoggingService');

  async createDirs(path: string) {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  }

  formatDate() {
    const timestamp = Date.now();
    const date = new Date(timestamp);
    const day = ('0' + date.getDate()).slice(-2);
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    const milliseconds = ('0' + date.getMilliseconds())
      .slice(-4)
      .padEnd(5, '0');
    const formattedDate = `${year}-${month}-${day}-${hours}-${minutes}-${seconds}-${milliseconds}`;
    return formattedDate;
  }

  async rotateLogFile(currentFilename: string): Promise<string> {
    const newName = `${this.formatDate()}.log`;
    const targetFileName = join(__dirname, '..', '..', '..', currentFilename);
    let newFileName: any = join(
      __dirname,
      '..',
      '..',
      '..',
      currentFilename,
    ).split(separator);
    newFileName[newFileName.length - 1] = newName;
    newFileName = newFileName.join(separator);
    try {
      await fs.promises.access(targetFileName, fs.constants.F_OK);
      await fsPromises.rename(targetFileName, newFileName);
      await fsPromises.writeFile(currentFilename, '', { flag: 'w' });
      // 'w': Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
    } catch (err) {}

    return Promise.resolve('Success');
  }

  async asyncWriteFile(data: any, type: string): Promise<string> {
    this.createDirs(join('src', 'logs', type));
    const targetFile = join('src', 'logs', type, 'logs.txt');
    await fsPromises.writeFile(targetFile, ``, { flag: 'a' });

    const stats = await fsPromises.stat(targetFile).catch(() => ({ size: 0 }));

    if (stats.size / 1024 >= maxFileSize) {
      await this.rotateLogFile(targetFile);
    }

    if (typeof data !== 'string') {
      const logDateTime = new Date(Date.now()).toString();
      data.date = logDateTime;
      data = JSON.stringify(data);
    }

    await fsPromises.writeFile(targetFile, `${data}\n`, { flag: 'a' });
    // 'a': Open file for appending. The file is created if it does not exist.
    return Promise.resolve('Success');
  }

  async log(message: any, ...optionalParams: any[]) {
    if (logLevel >= 1) {
      await this.asyncWriteFile(message, 'logs');
      super.log(message, ...optionalParams);
    }
  }

  async fatal(message: any, ...optionalParams: any[]) {
    if (logLevel >= 2) {
      this.asyncWriteFile(message, 'fatals');
      super.fatal(message, ...optionalParams);
    }
  }

  async error(message: any, ...optionalParams: any[]) {
    if (logLevel >= 3) {
      this.asyncWriteFile(message, 'errors');
      super.error(message, ...optionalParams);
    }
  }

  async warn(message: any, ...optionalParams: any[]) {
    if (logLevel >= 4) {
      this.asyncWriteFile(message, 'warns');
      super.warn(message, ...optionalParams);
    }
  }

  async debug(message: any, ...optionalParams: any[]) {
    if (logLevel >= 5) {
      this.asyncWriteFile(message, 'debugs');
      super.debug(message, ...optionalParams);
    }
  }

  async verbose(message: any, optionalParams?: string) {
    if (logLevel >= 6) {
      this.asyncWriteFile(message, 'verboses');
      super.verbose(message, ...optionalParams);
    }
  }
}
