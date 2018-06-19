function FB(num) {

    if (0 >= num || !Number.isInteger(num))
        throw new Error("bad input");
    if(0 == num % 15)
        return "FizzBuzz";
    if(0 == num % 3)
        return "Fizz";
    if(0 == num % 5)
        return "Buzz";

    return num;
}

exports.Generator = function (N) {
    if (0 >= N || !Number.isInteger(N))
        throw new Error("bad input");

    return Array.from(Array(N).keys()).map(x => FB(x+1)).join();
}

exports.FizzBuzz = FB;