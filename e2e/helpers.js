import { execSync, exec } from 'child_process';
import { existsSync, mkdirSync } from 'fs';
import path from 'path';
import moment from 'moment';

const simctlCommand = 'xcrun simctl io booted';

const startTime = moment().toISOString().replace(/:/g, '-');
const capturesDirectory = path.resolve(__dirname, 'captures', startTime);

let screenshotIndex = 0;
let videoIndex = 0;

const composeFilename = (prefix, count, label, extension) =>
  `${prefix}${count.toString().padStart(6, '0')}${label ? `-${label}` : ''}${extension}`;

const createDirectory = (path) => {
  if(!existsSync(path))
    mkdirSync(path);
};

export const labeledScreenshotTaker = (label) => (secondaryLabel) =>
  takeScreenshot(`${label}${secondaryLabel ? `-${secondaryLabel}` : ''}`);

export const takeScreenshot = (label) => {
  createDirectory(capturesDirectory);
  const screenshotFilename = path.resolve(capturesDirectory, composeFilename('s', screenshotIndex++, label, '.jpg'));

  execSync(`${simctlCommand} screenshot ${screenshotFilename}`, {
    timeout: 1000,
    killSignal: 'SIGKILL'
  });
};

let videoProcess = null;
export const startVideo = (label) => {
  if(videoProcess)
    return false;

  createDirectory(capturesDirectory);
  const videoFilename = path.resolve(capturesDirectory, composeFilename('v', videoIndex++, label, '.mp4'));

  videoProcess = exec(`${simctlCommand} recordVideo ${videoFilename}`);
  videoProcess.on('exit', () => {
    videoProcess = null;
  });

  return true;
};

export const stopVideo = () => {
  if(!videoProcess)
    return false;

  videoProcess.kill('SIGINT');
  videoProcess = null;

  return true;
};
