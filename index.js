const path = require('path')
const fs = require('fs')

module.exports = function (ops = {}) {
  const options = {
    path: [process.cwd(), ops.path || '.env'],
    encoding: ops.encoding || 'utf8',
    async: ops.async || false,
    override: ops.override || false,
    debug: ops.debug || false
  }

  const skipColor = '\x1b[0m';

  function setVars (content) {

    const parseObj = obj => {
      try {
        return JSON.parse(obj) ? obj : null
      }
      catch (e) { return null }
    }

    const messages = [];
    const lines = content.split(/\r\n|\n|\r/g);

    const reject = (lineNb, line, msgNb) => {
      if (options.debug) {
        const dmsgs = [
          `key or value is empty`,
          `key or value is not in valid format`,
          `key is already defined in process.env and will not be overwritten`
        ];

        messages.push(
          `\n\x1b[36m Line ${lineNb}${skipColor} - "${line}" ${skipColor}`,
          `\t\x1b[3${msgNb < 2 ? 1 : 3}m ${dmsgs[msgNb]}${skipColor}`
        );
      }
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i],
        lineNum = i + 1;

      if (line && !line.match(/^#\s?.*/g)) {
        const idxEq = line.indexOf('=')

        if (line.match(/^\w+[\.\w\s]*\=\s?(.*)?/g)) {

          let key = line.slice(0, idxEq).trim(),
            value = line.slice(idxEq + 1).trim();

          // validate and remove quotes
          if (/^("|').*|.*("|')$/.test(value)) {
            let m = value.match(/(?:\"|\').*/)
            value = m && m[0] === value ? value.slice(1, -1) : null;
          }

          // validate is object and parse it
          if (value && (value.match(/^\{.*\}$/) || value === 'null')) {
            value = parseObj(value);
          }

          if (key && value) {
            if (!options.override && process.env[key]) {
              reject(lineNum, line, 2);
            }
            else { process.env[key] = value; }
          }
          else { reject(lineNum, line, 1) }
        }
        else { reject(lineNum, line, 0) }
      }
    }

    if (options.debug) {
      console.log(`\x1b[32m[Envn Debug]${skipColor}`);
      messages.forEach(msg => console.log(msg))
    }
  }

  const envPathFile = path.resolve(...options.path);

  if (options.async) {
    fs.readFile(envPathFile, options.encoding, (err, content) => {
      if (err) console.error('\x1b[31m', err, skipColor);
      else setVars(content)
    });
  }
  else {
    const content = fs.readFileSync(envPathFile, options.encoding);
    setVars(content)
  }
}
