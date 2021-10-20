/* eslint-disable no-unused-vars */
export enum LOGLEVEL {
  ERROR = 1, // console.error
  WARN = 2, // console.warn error
  INFO = 3, // console.info warn error
  VERBOSE = 4, // console.log info warn error
  DEBUG = 5, // console.debug log info warn error
}

export interface LogInterface {
  level: LOGLEVEL;
  message: string;
  timestamp: string;
  print?: Function;
}

/**
 * @description Take to logging levels, one from the log, the other from the
 * environment, and compare. If the log's level is less than the environments
 * logging threshold, then return true; else return false and should not log.
 * @param {number} logLevel The log's logging level.
 * @param {number} envLevel The app's set logging level.
 * @returns {boolean} True: Log item should be logged; False: should not log.
 */
export const shouldLog = (logLevel: LOGLEVEL, envLevel: LOGLEVEL): boolean =>
  logLevel <= envLevel;

/**
 * @description Take a optional string to create a new datestring used for logging.
 * @param {string} dateString Date string used to initialize a new date.
 * @returns {string} Value that can be used to create a log timestamp.
 */
export const createLogTimestamp = (dateString?: string | number): string => {
  const date = dateString ? new Date(dateString) : new Date();
  return Number.isNaN(date.getTime())
    ? new Date().toUTCString()
    : date.toUTCString();
};

/**
 * @description Take a function wrapped console message and group them in the browser's console.
 * @param {string} label The name of the console grouping.
 * @param {Function} consoleMessage Wrapped function to executelog on.
 */
export const printLog = (label: string, consoleMessage?: Function): void => {
  if (consoleMessage) {
    console.group(label);
    consoleMessage();
    console.groupEnd();
  } else {
    console.log(label);
  }
};

export default {
  createLogTimestamp,
  LOGLEVEL,
  printLog,
  shouldLog,
};
