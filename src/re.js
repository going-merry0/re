import {
  State,
  CH_SPLIT,
  STATE_MATCH
} from './State'

const PLUS = '+'
const ASTE = '*'
const QUES = '?'
const VERB = '|'
const DOT = '.'
const PAREN_LEFT = '('
const PAREN_RIGHT = ')'

const ERR_UNBALANCED_PARENTHESES = new Error('unbalanced parentheses')
const ERR_DEFORMED_POSTFIX = new Error('deformed postfix')

let getOptPrecedence = (opt) => {
  switch (opt) {
    case PLUS:
    case ASTE:
    case QUES:
      return 3
    case DOT:
      return 2
    case VERB:
      return 1
  }
}

let isLeftOpt = (opt) => {
  return opt === VERB || opt === DOT
}

let isOpt = (ch) => {
  return ch === PLUS || ch === ASTE || ch === QUES || ch === VERB || ch === DOT
}

let isUnaryOpt = (ch) => {
  return ch === PLUS || ch === ASTE || ch === QUES
}

let isParen = (ch) => {
  return ch === PAREN_LEFT || ch === PAREN_RIGHT
}

let isCh = (ch) => {
  return !isOpt(ch) && !isParen(ch)
}

let re2postfix = (re) => {
  let out = []
  let opts = []
  let len = re.length

  let dotPos = -1
  for (let i = 0; i < len; i++) {
    let ch
    if (dotPos === i) {
      ch = DOT
    } else {
      ch = re[i]
    }

    if (isOpt(ch)) {
      let opt = ch
      let optPreced = getOptPrecedence(opt)
      let isLeft = isLeftOpt(opt)
      while (opts.length) {
        let opt1 = opts[opts.length - 1]
        if (isOpt(opt1)) {
          let opt1Preced = getOptPrecedence(opt1)
          if (isLeft && optPreced <= opt1Preced || !isLeft && optPreced < opt1Preced) {
            out.push(opts.pop())
            continue
          }
        }
        break
      }
      opts.push(opt)
    } else if (ch === PAREN_LEFT) {
      opts.push(ch)
    } else if (ch === PAREN_RIGHT) {
      let ok = false
      let opt = null
      while (opt = opts.pop()) {
        if (opt === PAREN_LEFT) {
          ok = true
          break
        } else {
          out.push(opt)
        }
      }
      if (!ok) {
        throw ERR_UNBALANCED_PARENTHESES
      }
    } else {
      out.push(ch)
    }

    if (dotPos !== i && i < len - 1) {
      let next = re[i + 1]
      if ((isCh(ch) || isUnaryOpt(ch) || ch === PAREN_RIGHT) && (isCh(next) || next === PAREN_LEFT)) {
        dotPos = i
        i--
      }
    } else {
      dotPos = -1
    }
  }

  let opt = null
  while (opt = opts.pop()) {
    if (isParen(opt)) {
      throw ERR_UNBALANCED_PARENTHESES
    }
    out.push(opt)
  }
  return out
}

let postfix2nfa = (postfix) => {
  let ch
  let s1
  let s2
  let s
  let states = []

  while (ch = postfix.shift()) {
    switch (ch) {
      case '.':
        s2 = states.pop()
        s1 = states.pop()
        s1.connect(s2)
        s1.danglingList = s2.danglingList
        states.push(s1)
        break
      case '|':
        s2 = states.pop()
        s1 = states.pop()
        s = new State(CH_SPLIT)
        s.out = s1
        s.out1 = s2
        s.addDangling(s1.danglingList)
        s.addDangling(s2.danglingList)
        states.push(s)
        break
      case '?':
        s1 = states.pop()
        s = new State(CH_SPLIT)
        s.out = s1
        s.addDangling(s1.danglingList)
        s.danglingList.push(s)
        states.push(s)
        break
      case '*':
        s1 = states.pop()
        s = new State(CH_SPLIT)
        s.out = s1
        s1.connect(s)
        s.danglingList.push(s)
        states.push(s)
        break
      case '+':
        s1 = states.pop()
        s = new State(CH_SPLIT)
        s.out = s1
        s1.connect(s)
        s1.danglingList = [s]
        states.push(s1)
        break
      default:
        s = new State(ch)
        s.danglingList.push(s)
        states.push(s)
        break
    }
  }
  if (states.length !== 1) {
    throw ERR_DEFORMED_POSTFIX
  }
  s = states[0]
  s.connect(STATE_MATCH)
  return s
}

let addState = (state, stateSet) => {
  if (state.ch === CH_SPLIT) {
    addState(state.out, stateSet)
    addState(state.out1, stateSet)
  } else {
    stateSet.add(state)
  }
}

let step = (currentSet, ch, nextSet) => {
  for (let state of currentSet) {
    if (state.ch === ch && state.out !== null) {
      addState(state.out, nextSet)
    }
  }
}

let re = (regexp, str) => {
  let postfix = re2postfix(regexp)
  let start = postfix2nfa(postfix)
  let currentSet = new Set()
  let nextSet = new Set()
  let tmp
  addState(start, currentSet)
  for (let ch of str) {
    step(currentSet, ch, nextSet)
    if (nextSet.length === 0) {
      break
    }
    tmp = currentSet
    currentSet = nextSet
    nextSet = tmp
    nextSet.clear()
  }
  return currentSet.has(STATE_MATCH)
}

export {
  re2postfix,
  postfix2nfa,
  re
}