// onload 
let container = document.querySelector(".container")
window.addEventListener("load", () => {
    container.classList.add("load")
})

// Select DOM elements
let input = document.querySelector("#amount")
let select = document.querySelectorAll("select")
let btn = document.querySelector(".btn-change")
let display = document.querySelector(".value-exchange")
let swap = document.querySelector(".swap")


//  fetch currency data from API
async function getData(apiLink) {
    try {
        let res = await fetch(apiLink)
        let data = await res.json()
        for (let k in data.rates) {
            select.forEach(el => {
                let option = document.createElement("option")
                option.textContent = k
                option.value = k
                el.append(option)
            })
        }
        btn.addEventListener("click", () => {
            calc(data.rates)
        })
        swap.addEventListener("click", () => {
            [select[0].value, select[1].value] = [select[1].value, select[0].value];
            calc(data.rates)

        })
    } catch { throw (new Error("Error")) }


}

function calc(data) {
    let reg = /^\d+([.,]\d+)?$/
    if (!reg.test(input.value)) {
        display.textContent = "Not A Number"
        return
    }
    let value = (input.value / data[select[0].value]);
    display.textContent = ` ${input.value} ${select[0].value} = ${(value * data[select[1].value]).toFixed(3)} ${select[1].value}`
}
getData("https://api.currencyfreaks.com/v2.0/rates/latest?apikey=c350919a81d84567b8f4f538bd5969e2")
