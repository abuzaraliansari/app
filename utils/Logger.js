import RNFS from 'react-native-fs';

const LOG_FILE_PATH = `${RNFS.DocumentDirectoryPath}/app_log.txt`;

export const logToFile = async (message) => {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] ${message}\n`;
  try {
    await RNFS.appendFile(LOG_FILE_PATH, logMessage, 'utf8');
  } catch (err) {
    // Optionally handle logging error
    console.warn('Failed to write log:', err);
  }
};

export const getLogFilePath = () => LOG_FILE_PATH;