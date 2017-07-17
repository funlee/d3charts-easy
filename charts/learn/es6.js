/**
 * @Author:       lee
 * @Email:        i@funlee.cn
 * @DateTime:     2017-07-13 23:53:49
 * @Description:  学习ES6
 * @Last Modified:2017-07-13 23:53:49
 */
export default ()=> {
    var log = console.log.bind(console)
    log('study es6')
    //symbol
    // let s = Symbol()
    // log(typeof s) //symbol
    // let s1 = Symbol('test str')
    // log(s1.toString()) //Symbol(test str)
    // let s2 = Symbol('str')
    // let s3 = Symbol('str')
    // log(s2 == s3) //false
    // let mySymbol = Symbol()
    // let a = {}
    // a[mySymbol] = 'hello'
    // log(a)

    //set
    // const s = new Set();
    // [2, 3, 5, 4, 5, 2, 2].forEach(x => s.add(x));

    // for (let i of s) {
    //   log(i);
    // }
    // log(s)

    // const setArr = new Set([1,1,2,2,3,3,4,5])
    // log(setArr.size)

    // var eqArr = [1,2,3,3,4,4,5,5,6,6]
    // log([...new Set(eqArr)])

    // let set = new Set(['red', 'green', 'blue']);
    // let arr = [...set];
    // log(set)
    //weakSet

    let weakSet = new weakSet()
    


}