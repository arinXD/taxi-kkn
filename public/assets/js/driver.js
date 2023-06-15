
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { 
    getFirestore, 
    collection, 
    getDocs, 
    // addDoc, 
    // deleteDoc, 
    // doc
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js"

const firebaseConfig = {
  apiKey: "AIzaSyCPB9qlULoVPOL4RUB9CnSMLb15qcDjx0w",
  authDomain: "taxi-kkn-efc83.firebaseapp.com",
  projectId: "taxi-kkn-efc83",
  storageBucket: "taxi-kkn-efc83.appspot.com",
  messagingSenderId: "813679880803",
  appId: "1:813679880803:web:fb8a1b5901a08d1d12e656",
  measurementId: "G-261XJSPC6H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const driverDiv = document.querySelector(".driver-list")
// const form = document.getElementById("addForm")

async function getDrivers(db) {
    const drivers = collection(db, "drivers")
    const driverSnapshot = await getDocs(drivers)

    return driverSnapshot
}

function showData(driver) {
    // driver.data().fname
    console.log(driver.data().fname)
    let driverItem = document.createElement('div')
    
    let driverHead = document.createElement('div')
    driverHead.setAttribute('class','head')
    let img = document.createElement('img')
    let pHead = document.createElement('p')
    let spanHead = document.createElement('span')
    pHead.setAttribute('class','name')
    spanHead.innerHTML = driver.data().fname+" "+driver.data().lname
    pHead.appendChild(spanHead)
    pHead.innerHTML = pHead.innerHTML+" driver@email.com"
    img.src = "./assets/images/icon/user.png"
    driverHead.appendChild(img)
    driverHead.appendChild(pHead)

    let driverBody = document.createElement('div')
    driverBody.setAttribute('class','body')
    let ul = document.createElement('ul')
    ul.setAttribute('class','tag')
    let li1 = document.createElement('li')
    li1.setAttribute('class','finance')
    li1.innerHTML = "Finance Tag"
    let li2 = document.createElement('li')
    li2.setAttribute('class','game')
    li2.innerHTML = "Game Tag"
    ul.appendChild(li1)
    ul.appendChild(li2)
    let pBody = document.createElement('p')
    let spanBody = document.createElement('span')
    spanBody.innerHTML = "รหัส (Code): "
    pBody.appendChild(spanBody)
    pBody.innerHTML = pBody.innerHTML + driver.data().code
    driverBody.appendChild(ul)
    driverBody.appendChild(pBody)

    let driverFooter = document.createElement('div')
    driverFooter.setAttribute("class","footer")
    let i = document.createElement("i")
    i.setAttribute('class','fa fa-info-circle')
    i.setAttribute('aria-hidden','true')
    let spanFooter = document.createElement('span')
    spanFooter.innerHTML = " More details"
    i.appendChild(spanFooter)
    driverFooter.appendChild(i)
    
    driverItem.setAttribute('class', "driver-item")
    driverItem.appendChild(driverHead)
    driverItem.appendChild(driverBody)
    driverItem.appendChild(driverFooter)
    driverDiv.appendChild(driverItem)

}

async function getData(){
    const data = await getDrivers(db)
    driverDiv.innerHTML = ""

    data.forEach(element => {
        showData(element)
    });
}
getData()


