import {
  re
} from './re'

let args = process.argv.slice(2)
if (args.length < 2) {
  console.error('usage: npm run re yourRegexp yourSubject')
  process.exit()
}

if (re(args[0], args[1])) {
  console.log('pass')
} else {
  console.log('not pass')
}