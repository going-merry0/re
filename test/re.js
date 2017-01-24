import assert from 'assert'
import {
  describe,
  it
} from 'mocha'
import {
  re
} from '../src/re'

describe('re', function () {
  describe('a', function () {
    it('should pass "a"', function () {
      assert.equal(re('a', 'a'), true)
    })
  })

  describe('abc', function () {
    it('should pass "abc"', function () {
      assert.equal(re('abc', 'abc'), true)
    })
  })

  describe('a|bc', function () {
    it('should pass "bc"', function () {
      assert.equal(re('a|bc', 'bc'), true)
    })
  })

  describe('(a|bc)d', function () {
    it('should pass "bcd"', function () {
      assert.equal(re('(a|bc)d', 'bcd'), true)
    })
  })

  describe('a+', function () {
    it('should pass "a"', function () {
      assert.equal(re('a+', 'a'), true)
    })
  })

  describe('a+', function () {
    it('should pass "aaa"', function () {
      assert.equal(re('a+', 'aaa'), true)
    })
  })

  describe('a?b', function () {
    it('should pass "b"', function () {
      assert.equal(re('a?b', 'b'), true)
    })
  })

  describe('a?b', function () {
    it('should pass "ab"', function () {
      assert.equal(re('a?b', 'ab'), true)
    })
  })

  describe('a?b', function () {
    it('should not pass "aab"', function () {
      assert.equal(re('a?b', 'aab'), false)
    })
  })

  describe('a*', function () {
    it('should pass ""', function () {
      assert.equal(re('a*', ''), true)
    })
  })

  describe('a*b', function () {
    it('should pass "aaab"', function () {
      assert.equal(re('a*b', 'aaab'), true)
    })
  })

  describe('a(bb)+c', function () {
    it('should pass "abbbbc"', function () {
      assert.equal(re('a(bb)+c', 'abbbbc'), true)
    })
  })

  describe('a(bb)+c', function () {
    it('should not pass "abbbc"', function () {
      assert.equal(re('a(bb)+c', 'abbbc'), false)
    })
  })
})