const fs = require("fs");

module.exports = {
  isNull: (obj) => {
    return obj === undefined || obj === null;
  },
  hasGoogleAplicationCredentials: () => {
    const variable = process.env.GOOGLE_APPLICATION_CREDENTIALS;

    if (variable === undefined) {
      return false;
    }

    if (!fs.existsSync(variable)) {
      return false;
    }

    return true;
  },
};
