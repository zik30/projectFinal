//todo characters

const characters = document.querySelector('.characters_inner')

const getDragon = async (img, name, age, text,  index) =>{
    const response = await fetch('../json/dragon.json')
    const data = await response.json()

    img.style.backgroundImage = `url(${data[index].img})`
    name.innerText = data[index].name
    age.innerText = data[index].breed
    text.style.right = "80%"
}

const create = (person, index) =>{
    const img = document.createElement("div");
    const name = document.createElement("h2");
    const age = document.createElement("h3");
    const text = document.createElement('div')

    img.setAttribute('class', 'character')
    name.setAttribute('class', 'character_name')
    age.setAttribute('class', 'character_age')
    text.setAttribute('class', 'text')

    characters.appendChild(img)
    img.appendChild(text)
    text.append(name)
    text.append(age)



    img.style.backgroundImage = person.img
    name.innerText = person.name
    age.innerText = person.age

    img.onclick = () =>{
        getDragon(img, name, age, text, index)
    }
}

const getData = async () =>{
    const response = await fetch('../json/person.json')
    const data = await response.json()
    data.forEach((person, index) => {
        create(person, index)

    })
}
getData()