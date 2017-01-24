import assert from 'assert'
import {
  describe,
  it
} from 'mocha'
import {
  re2postfix
} from '../src/re'

describe('postfix', function () {
  describe('a', function () {
    it('should equal "a"', function () {
      assert.equal(re2postfix('a').join(''), 'a')
    })
  })

  describe('abc', function () {
    it('should equal "ab.c."', function () {
      assert.equal(re2postfix('abc').join(''), 'ab.c.')
    })
  })

  describe('a|bc', function () {
    it('should equal "abc.|"', function () {
      assert.equal(re2postfix('a|bc').join(''), 'abc.|')
    })
  })

  describe('(a|bc)d', function () {
    it('should equal "abc.|d."', function () {
      assert.equal(re2postfix('(a|bc)d').join(''), 'abc.|d.')
    })
  })

  describe('a(bc)+d', function () {
    it('should equal "abc.+.d."', function () {
      assert.equal(re2postfix('a(bc)+d').join(''), 'abc.+.d.')
    })
  })
})