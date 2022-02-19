let adults
let child
let q

let q5h = [400, 1200, 1000]
let q6h = [650, 2000, 1500]


onload = function () {
  stateNow(welcome)
  btn.addEventListener('click', getInputs)
  letsGo.addEventListener('click', showChurrascometro)
  adultos.addEventListener('keyup', nextField)
  criancas.addEventListener('keyup', nextField)
  gear.addEventListener('click', showSettings)
  cancelar.addEventListener('click', function (){
    stateAfter(settings)
    stateNow(churrascometro)
    setTimeout(() => {
      settings.className = "churrascometro before"
      adultos.focus()
    }, 500);
  })
  salvar.addEventListener('click', saveQ)
}

function saveQ () {
  q5h[0] = meat5h.value
  q5h[1] = beer5h.value
  q5h[2] = drinks5h.value
  q6h[0] = meat6h.value
  q6h[1] = beer6h.value
  q6h[2] = drinks6h.value
  stateAfter(settings)
  stateNow(churrascometro)
  setTimeout(() => {
    settings.className = "churrascometro before"
    adultos.focus()
  }, 500);
  
}

function nextField(event) {
  if(event.key=="Enter") {
    if(event.target.id=="adultos") {
      criancas.focus()
    } else {
      getInputs()
    }
  }
}

function showChurrascometro () {
  stateAfter(welcome)
  stateNow(churrascometro)
  setTimeout(() => {
    adultos.focus()
    welcome.remove()
  }, 500);
}

function showSettings (){
  stateAfter(churrascometro)
  loadSettings()
  stateNow(settings)
  setTimeout(() => {
    churrascometro.className = "churrascometro before"
  }, 500);
}

function loadSettings() {
  meat5h.value = q5h[0]
  beer5h.value = q5h[1]
  drinks5h.value = q5h[2]
  meat6h.value = q6h[0]
  beer6h.value = q6h[1]
  drinks6h.value = q6h[2]
}

function stateNow(element) {
  element.className += " now"
}

function stateAfter(element) {
  element.className += " after"
}


let validation = function () {
  let adultEmpty = adultos.value == ""
  let childEmpty = criancas.value == ""
  if (adultEmpty || childEmpty) {
    error.innerHTML = `<p id="erro">Preencha todos os campos e tente novamente.</p>`
    setTimeout(() => {
      erro.remove()
    }, 3000);
    return false
  } else {
    return true
  }
}

function getInputs() {
  if(validation()) {
    adults = adultos.value
    child = criancas.value
    let radios = document.getElementsByName('tempo')
    for (const i in radios) {
      if(radios[i].checked) {
        q = radios[i].value
      }
    }
    if (q < 6) {
      q = q5h
    } else {
      q = q6h
    }
    
    calculate(adults, child, q)
  }
}

function calculate(adults, child, q) {
  let result = [calcMeat(adults, child, q), calcBear(adults, q), calcDrinks(adults, child, q)]

  res.innerHTML = `
  <p>Para um churrasco ideal, leve:</p>
      <ul>
        <li>${(result[0]/1000)} kg de carne</li>
        <li>${Math.ceil(result[1]/355)} latinhas de cerveja</li>
        <li>${(result[2]/1000)} Litros de bebidas (água/refrigerante)</li>
      </ul>
  `
}

function calcMeat(adults, child, q) {
  return (adults * q[0]) + ((child * q[0])/2)
}

function calcBear(adults, q) {
  return (adults * q[1])
}

function calcDrinks(adults, child, q) {
  return (adults * q[2]) + ((child * q[2])/2)
}