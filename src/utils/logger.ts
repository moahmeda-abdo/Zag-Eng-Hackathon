import winston, { createLogger, format, transports } from "winston";

let Logger: winston.Logger;

function initializeLogger(svcName: string) {
  Logger = createLogger({
    format: format.json(),
    defaultMeta: { service: svcName },
    transports: [
      new transports.File({ filename: "error.log", level: "error", format: format.json() }),
      new transports.File({ filename: "combined.log", format: format.json()}),
      
    ],
  });

  if (process.env.NODE_ENV === "production") {
    Logger.add(
      new transports.Console({
        format:format.simple(),
      })
    );
  } else {
    Logger.add(
      new transports.Console({
        format: format.combine(format.colorize(), format.simple()),
      })
    );
  }
}

export { Logger, initializeLogger };
