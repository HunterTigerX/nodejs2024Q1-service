import { ConsoleLogger, Injectable, Logger } from '@nestjs/common';
import { promises as fsPromises } from 'fs';
import { join } from 'path';
import * as dotenv from 'dotenv';
import * as path from 'path';

const separator = path.sep;
dotenv.config();
const logLevel = +process.env.LOG_LEVEL;
const maxFileSize = +process.env.MAX_FILE_SIZE;

@Injectable()
export class LoggingService extends ConsoleLogger {
  private readonly logger = new Logger('LoggingService');

  async rotateLogFile(currentFilename: string) {
    const newName = `${Date.now()}.txt`;
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
    await fsPromises.rename(targetFileName, newFileName);
    await fsPromises.writeFile(currentFilename, '', { flag: 'w' });
    // 'w': Open file for writing. The file is created (if it does not exist) or truncated (if it exists).
  }

  async asyncWriteFile(data: any, type: string) {
    const targetFile = join('src', 'logs', type, 'logs.txt');
    const stats = await fsPromises.stat(targetFile).catch(() => ({ size: 0 }));

    if (stats.size / 1024 >= maxFileSize) {
      await this.rotateLogFile(targetFile);
    }

    try {
      const logDateTime = new Date(Date.now()).toString();
      data.date = logDateTime;
      const result = `${data.date}, url - ${data.url}, query parameters - ${JSON.stringify(data.queryParams)}, body - ${JSON.stringify(data.body)}\n`;
      await fsPromises.writeFile(targetFile, result, { flag: 'a' });
      // 'a': Open file for appending. The file is created if it does not exist.
    } catch (err) {
      this.error(err);
    }
  }

  log(message: any, ...optionalParams: any[]) {
    if (logLevel >= 1) {
      if (typeof message !== 'string') {
        this.asyncWriteFile(message, 'logs');
      }
      super.log(message, ...optionalParams);
    }
  }

  fatal(message: any, ...optionalParams: any[]) {
    if (logLevel >= 2) {
      if (typeof message !== 'string') {
        this.asyncWriteFile(message, 'fatals');
      }
      super.fatal(message, ...optionalParams);
    }
  }

  error(message: any, ...optionalParams: any[]) {
    if (logLevel >= 3) {
      if (typeof message !== 'string') {
        this.asyncWriteFile(message, 'errors');
      }
      super.error(message, ...optionalParams);
    }
  }

  warn(message: any, ...optionalParams: any[]) {
    if (logLevel >= 4) {
      if (typeof message !== 'string') {
        this.asyncWriteFile(message, 'warns');
      }
      super.warn(message, ...optionalParams);
    }
  }

  debug(message: any, ...optionalParams: any[]) {
    if (logLevel >= 5) {
      if (typeof message !== 'string') {
        this.asyncWriteFile(message, 'debugs');
      }
      super.debug(message, ...optionalParams);
    }
  }

  verbose(message: any, optionalParams?: string) {
    if (logLevel >= 6) {
      if (typeof message !== 'string') {
        this.asyncWriteFile(message, 'verboses');
      }
      super.verbose(message, ...optionalParams);
    }
  }
}
