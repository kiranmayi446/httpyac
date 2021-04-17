import { ErrorDescription } from '../models';

export function parseError(err: Error) : ErrorDescription{
  if (err.stack) {
    const match = /^(?<error>.*):\s*(?<message>.*)\r?\n\s*at (?<file>.*):(?<line>\d*):(?<offset>\d*)/m.exec(err.stack);

    if (match && match.groups?.error) {
      return {
        error: err,
        errorType:  match.groups.error,
        message: match.groups.message,
        file: match.groups.file,
        line: match.groups.line,
        offset: match.groups.offset,
        displayMessage: `${match.groups.error}: ${match.groups.message} - ${match.groups.file}:${match.groups.line}:${match.groups.offset}`
      };
    }
  }
  return {
    error: err,
    displayMessage: err.message,
  };
}