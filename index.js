const path = require('path')
const fs = require('fs')

module.exports = function (ops) {
  const options = {
    path: [process.cwd(), ops.path || '.env'],
    encoding: ops.encoding || 'utf8',
    async: ops.async || false,
    override: ops.override || false,
    debug: ops.debug || false
  }

  const skipColor = '\x1b[0m';

  function setEnVars (content) {
    function parseObj (obj) {
      try {
        return JSON.parse(obj)
      } catch (error) {
        return obj
      }
    }

    const messages = [];
    const lines = content.split(/\r\n|\n|\r/g);

    const reject = (lineNb, line, msgNb) => {
      const dmsgs = [
        `key or value is empty`,
        `key or value is not in valid format`,
        `is already defined in process.env and will not be overwritten`
      ];

      messages.push(`\x1b[3${msgNb < 2 ? 1 : 3}m`, `${lineNb} - "${line}" ${dmsgs[msgNb]}`, skipColor);
    }

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i],
        lineNum = i + 1;

      if (line && !line.match(/^#\s?.*/g)) {
        const idxEq = line.indexOf('=')

        if (line.match(/^\w+[\.\w\s]*\=\s?(.*)?/g)) {

          let key = line.slice(0, idxEq).trim(),
            value = line.slice(idxEq + 1).trim();

          if (key && value) {
            if (value.match(/^\{.*\}$/)) { // validate is object and parse it
              value = parseObj(value);
            }

            // validate and remove quotes
            //value =typeof value === 'string' && value.match(qr) ? value.replace(qr, "$1") : reject(lineNum, line, 1)

            if (!options.override && process.env[key]) {
              reject(lineNum, key, 2);
            }
            else { process.env[key] = value; }
          }
          else { reject(lineNum, key, 1) }
        }
        else { reject(lineNum, line, 0) }
      }
    }

    if (options.debug) {
      messages.forEach(msg => console.log(msg))
    }
  }

  const envPathFile = path.resolve(...options.path);

  if (options.async) {
    fs.readFile(envPathFile, options.encoding, (err, content) => {
      if (err) console.error('\x1b[31m', err, skipColor);
      else setEnVars(content)
    });
  }
  else {
    const content = fs.readFileSync(envPathFile, options.encoding);
    setEnVars(content)
  }
}
