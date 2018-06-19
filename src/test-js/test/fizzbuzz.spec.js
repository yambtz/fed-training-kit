var fizzbuzz = require("../fizzbuzz");
var chai = require("chai");

describe("FizzBuzz tests", function() {
    it("fizzbuzz returns a number", function() {
        chai.expect(fizzbuzz.FizzBuzz(1)).to.be.a("number");
    });

    it("FizzBuzz returns 1 for the number 1", function() {
        chai.expect(fizzbuzz.FizzBuzz(1)).to.equal(1);
    });

    it("FizzBuzz returns Fizz for the number 6", function () {
        chai.expect(fizzbuzz.FizzBuzz(6)).to.deep.equal("Fizz");
    });

    it("FizzBuzz returns Buzz for the number 10", function () {
        chai.expect(fizzbuzz.FizzBuzz(10)).to.deep.equal("Buzz");
    });

    it("FizzBuzz returns FizzBuzz for the number 30", function () {
        chai.expect(fizzbuzz.FizzBuzz(30)).to.equal("FizzBuzz");
    });

    it("FizzBuzz should throw an error for -1", function() {
        chai.expect(fizzbuzz.FizzBuzz.bind(-1)).to.throw('bad input');
    });

    it("FizzBuzz should throw an error for 0", function() {
        chai.expect(fizzbuzz.FizzBuzz.bind(0)).to.throw('bad input');
    });
});

describe("FizzBuzz Generator tests", function() {
   it("FB generator should return a string", function() {
       chai.expect(fizzbuzz.Generator(1)).to.be.a("string");
   });

   it("FB generator returns '1' for 1", function() {
        chai.expect(fizzbuzz.Generator(1)).to.equal('1');
    });

    it("FB generator returns '1,2,Fizz,4,Buzz,Fizz,7,8,Fizz,Buzz,11,Fizz,13,14,FizzBuzz,16' for 16", function() {
        chai.expect(fizzbuzz.Generator(16)).to.equal('1,2,Fizz,4,Buzz,Fizz,7,8,Fizz,Buzz,11,Fizz,13,14,FizzBuzz,16');
    });

    it("FB generator should throw for non-natural numbers", function() {
        chai.expect(fizzbuzz.Generator.bind(-1)).to.throw('bad input');
    });
});