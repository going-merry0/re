class State {
  ch = ''
  out = null
  out1 = null
  danglingList = []

  constructor(ch, out = null, out1 = null) {
    this.ch = ch
    this.out = out
    this.out1 = out1
  }

  connect(state) {
    for (let d of this.danglingList) {
      if (d.out === null) {
        d.out = state
      } else if (d.out1 === null) {
        d.out1 = state
      }
    }
  }

  addDangling(dl) {
    this.danglingList = this.danglingList.concat(dl)
  }
}

const CH_SPLIT = 256
const CH_MATCH = 257

const STATE_MATCH = new State()
STATE_MATCH.ch = CH_MATCH

export {
  CH_SPLIT,
  CH_MATCH,
  STATE_MATCH,
  State
}