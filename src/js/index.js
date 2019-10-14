import { observable, autorun } from 'mobx'
const addBtn = document.getElementById('add')
const minusBtn = document.getElementById('minus')
const incomeLabel = document.getElementById('incomeLabel')
const bankUser = observable({
    name: 'Ivan Fan',
    income: 3,
    debit: 2
});

console.log(bankUser)

const incomeDisposer = autorun(() => {
  incomeLabel.innerText = `${bankUser.name} income is ${bankUser.income}`
})

addBtn.addEventListener('click', ()=> {
    bankUser.income ++
})
minusBtn.addEventListener('click', () => {
    bankUser.income --
})