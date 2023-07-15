import type {Config} from '@jest/types';
// Sync object
const config: Config.InitialOptions = {
  verbose: true,
  transform: {
  "^.+\\.tsx?$": "ts-jest",
  },
  setupFilesAfterEnv: ["jest-os-detection"],
  testPathIgnorePatterns:["/build/","/node_modules/"]
};
export default config;