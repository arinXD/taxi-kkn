
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js"

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
const table = document.getElementById("driver-table")
const form = document.getElementById("addForm")

async function getDrivers(db) {
    const drivers = collection(db, "drivers")
    const driverSnapshot = await getDocs(drivers)

    return driverSnapshot
}

function showData(driver) {
    // driver.data().fname
    console.log(driver.data().fname)
    const row = table.insertRow(-1)
    const nameCol = row.insertCell(0)
    const codeCol = row.insertCell(1)
    const delCol = row.insertCell(2)

    nameCol.innerHTML = driver.data().fname
    codeCol.innerHTML = driver.data().code

    let btn = document.createElement('button')
    btn.innerHTML = "ลบข้อมูล"
    btn.setAttribute('class','btn btn-danger')
    btn.setAttribute('data-id', driver.id)
    delCol.appendChild(btn)

    btn.addEventListener('click', (e)=>{
        let id = e.target.getAttribute('data-id')
        deleteDoc(doc(db, 'drivers', id))
        getData()
    })
}

async function getData(){
    const data = await getDrivers(db)
    table.innerHTML = ""

    data.forEach(element => {
        showData(element)
    });
}
getData()


form.addEventListener('submit',(e)=>{
    e.preventDefault()
    addDoc(collection(db,"drivers"),{
        fname: form.fname.value,
        lname: form.lname.value,
        code: form.code.value
    })
    // console.log(form.fname.value);
    alert("บันทึกข้อมูลเรียบร้อย")
    form.fname.value = ""
    form.lname.value = ""
    form.code.value = ""
    getData()
})

