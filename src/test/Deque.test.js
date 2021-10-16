const DequeProtType = {
    length:0,
    first:undefined,
    last:undefined,
    [Symbol.iterator]:function(){
        const f = this.first
        return {
            current : {next:f},
            next(){
                return (this.current = this.current.next) 
                    ? {value: this.current.value, done: false}
                    : {done: true}
            }
        }
    },
    get(i){
        let node_ = this.first
        while(i-- && node_ && (node_ = node_.next));
        return node_ ? node_.value : node_
    },
    push(item){
        if(this.length) this.last = this.last.next = {value:item,before:this.last}
        else this.first = this.last = {value:item}
        this.length++
    },
    unshift(item){
        if(this.length) this.first = this.first.before = {value:item,next:this.first}
        else this.first = this.last = {value:item}
        this.length++
    },
    pop(){
        if(!this.length) return undefined
        if(this.length === 1) return this.shift()
        const item = this.last.value
        this.last = this.last.before
        if(this.last) this.last.next = undefined
        this.length--
        return item
    },
    shift(){
        if(!this.length) return undefined
        const item = this.first.value
        this.first = this.first.next
        if(this.first) this.first.before = undefined
        this.length--
        return item
    },
}

const Deque = (arr) => {
    const arrToNode = (arr) => {
        return arr.map(_=>({value:_})).map((_,i,arr_)=>{
            _.next = arr_[i + 1]
            _.before = arr_[i - 1]
            return _
        })
    }
    const node = arrToNode(arr)
    const obj = Object.assign(Object.create(DequeProtType),{
        first:node[0],last:node[node.length - 1],length:node.length
    })
    return obj
}

describe('Dequeテスト', () => {

    const unshift = (d) => {
        const arr = [...d]
        expect([...d]).toStrictEqual(arr)
        expect(d.length).toBe(arr.length)

        const num = Math.random()
        d.unshift(num)
        arr.unshift(num)
        expect([...d]).toStrictEqual(arr)
        expect(d.length).toBe(arr.length)
    }

    const push = (d) => {
        const arr = [...d]
        expect([...d]).toStrictEqual(arr)
        expect(d.length).toBe(arr.length)

        const num = Math.random()
        d.push(num)
        arr.push(num)
        expect([...d]).toStrictEqual(arr)
        expect(d.length).toBe(arr.length)
    }

    const shift = (d) => {
        const arr = [...d]
        expect([...d]).toStrictEqual(arr)
        expect(d.length).toBe(arr.length)

        d.shift()
        arr.shift()
        expect([...d]).toStrictEqual(arr)
        expect(d.length).toBe(arr.length)
    }

    const pop = (d) => {
        const arr = [...d]
        expect([...d]).toStrictEqual(arr)
        expect(d.length).toBe(arr.length)

        expect(d.pop()).toStrictEqual(arr.pop())
        expect([...d]).toStrictEqual(arr)
        expect(d.length).toBe(arr.length)
    };

    const shuffle = (arr) => {
        return arr.map(function(a){return {weight:Math.random(), value:a}})
            .sort(function(a, b){return a.weight - b.weight})
            .map(function(a){return a.value})
      }
    

    const ptn = () => [
        [unshift,unshift,unshift,shift,shift,shift],
        [unshift,shift,shift,shift],
        [unshift,unshift,unshift,shift],
        [push,push,push,shift,shift,shift],
        [push,push,push,,shift],
        [push,shift,shift,shift],
        [unshift,push,unshift,shift,shift,shift],
        [unshift,push,unshift,shift,shift],
        [unshift,push,push,shift,shift,shift],

        [unshift,unshift,unshift,pop,pop,pop],
        [unshift,pop,pop,pop],
        [unshift,unshift,unshift,pop],
        [push,push,push,pop,pop,pop],
        [push,push,push,,pop],
        [push,pop,pop,pop],
        [unshift,push,unshift,pop,pop,pop],
        [unshift,push,unshift,pop,pop],
        [unshift,push,push,pop,pop,pop],

        [unshift,unshift,unshift,shift,pop,shift],
        [unshift,pop,shift,pop],
        [unshift,unshift,unshift,pop],
        [push,push,push,shift,shift,pop],
        [push,push,push,,pop],
        [push,shift,shift,pop],
        [unshift,push,unshift,pop,shift,shift],
        [unshift,push,unshift,shift,pop],
        [unshift,push,push,pop,shift,pop],

    ].map(case_=>[case_,shuffle(case_),shuffle(case_),shuffle(case_),shuffle(case_)]).flat(1)

    
    let i = 1
    ptn().forEach((cases)=>{
        test('case_1.' + i++, ()=>{
            const d = Deque([])
            cases.forEach((case_)=>{
                case_(d)
            })
        })
    })

    
    i = 1
    ptn().forEach((cases)=>{
        test('case_2.' + i++, ()=>{
            const d = Deque([1])
            cases.forEach((case_)=>{
                case_(d)
            })
        })
    })

    i = 1
    ptn().forEach((cases)=>{
        test('case_3.' + i++, ()=>{
            const d = Deque([1,2])
            cases.forEach((case_)=>{
                case_(d)
            })
        })
    })

    i = 1
    ptn().forEach((cases)=>{
        test('case_4.' + i++, ()=>{
            const d = Deque([1,2,3])
            cases.forEach((case_)=>{
                case_(d)
            })
        })
    })

    i = 1
    ptn().forEach((cases)=>{
        test('case_5.' + i++, ()=>{
            const d = Deque(shuffle([1,2,3,1,2,3,1,2,3,1,2,3]))
            cases.forEach((case_)=>{
                case_(d)
            })
        })
    })
});