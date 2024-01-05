class Calculator {
    constructor(po, co, histt) {
        this.po = po;
        this.co = co;
        this.histt = histt
        this.clear();
        this.his = []
    }

    clear() {
        this.cp = '';
        this.pp = '';
        this.oppEq = undefined
    }
    delete() {
        this.cp = this.cp.toString().slice(0, -1)
    }
    appendNum(num) {
        if (num === '.' && this.cp.includes('.')) return
        this.cp = this.cp.toString() + num.toString()

    }

    historic(p) {
        // this.histt.innerHTML = `<div class="text-2xl text-white">${p}</div>`
        this.histt.innerText = ''
        this.his.forEach(p => {
            this.histt.innerHTML = `${this.histt.innerHTML}<div class="text-2xl text-white">${p}</div>`
        })
    }
    equation(opp) {
        if (this.cp === '') return
        if (this.pp !== '') {
            this.comput()
        }
        this.oppEq = opp
        this.pp = this.cp
        this.cp = ''
    }
    update() {
        this.co.innerText = this.getDis(this.cp)
        if (this.oppEq !== undefined) {
            this.po.innerText = `${this.getDis(this.pp)} ${this.oppEq}`
        }
    }
    comput() {
        let computation
        let prev = parseFloat(this.pp)
        let current = parseFloat(this.cp)
        if (isNaN(prev) || isNaN(current)) return

        switch (this.oppEq) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                if (current === 0) {
                    this.cp = 'cannot devide by 0'
                    return
                }
                computation = prev / current
                break
            default:
                return
        }
        this.his.push(this.pp + this.oppEq + this.cp + ' = ' + computation)
        this.historic(this.pp + this.oppEq + this.cp + ' = ' + computation)
        this.cp = computation
        this.pp = ''
        this.oppEq = undefined
    }

    getDis(num) {
        const stringNum = num.toString()
        const intNum = parseFloat(stringNum.split('.')[0])
        const dicimalNum = stringNum.split('.')[1]
        const fnum = parseFloat(num)
        if (isNaN(fnum)) return ''

        return fnum.toLocaleString('en')
    }
}


const getNumbers = document.querySelectorAll('[data-num]')
const getOpp = document.querySelectorAll('[data-opp]')
const getDel = document.querySelector('[data-delete]')
const getPO = document.querySelector('[data-po]')
const getCO = document.querySelector('[data-co]')
const getClear = document.querySelector('[data-clear]')
const getEq = document.querySelector('[data-equel]')
const his = document.querySelector('[data-his]')



const cal = new Calculator(getPO, getCO, his)


getNumbers.forEach(button => {
    button.addEventListener('click', () => {
        cal.appendNum(button.innerText)
        cal.update()
    })
})

getOpp.forEach(button => {
    button.addEventListener('click', () => {
        cal.equation(button.innerText)
        cal.update()
    })
})


getClear.addEventListener('click', () => {
    cal.clear()
    cal.update()
})
getEq.addEventListener('click', () => {
    cal.comput()
    cal.update()
})
getDel.addEventListener('click', () => {
    cal.delete()
    cal.update()
})



// https://dribbble.com/shots/7518714-UI-calculator/attachments/331081?mode=media