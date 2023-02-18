let menuLink = document.querySelector('.menu');
// console.log(menuLink);

// when clicked on menu then display the foods items
menuLink.addEventListener('click',() => {
    getMenu();
});


let menuSection = document.getElementById('menu');
// console.log(menuSection);

let foodItems;

async function getMenu(){
    const response = await fetch('https://free-food-menus-api-production.up.railway.app/burgers');
    const data = await response.json();

    foodItems = data;
    // console.log(data);
    for (const d of data) {
        // console.log(d.img);
        let div = document.createElement('div');
        div.className = "item";
        let img = document.createElement('img');
        img.src = d.img;
        div.appendChild(img);
        let span1 = document.createElement('span');
        let span2 = document.createElement('span');
        span1.innerText = `Name : ${d.name}`;
        span2.innerText = `Price : ${d.price}₹`;
        div.appendChild(span1);
        div.appendChild(span2);

        menuSection.appendChild(div);
    }
}

let takeOrderBtn = document.getElementById('takeOrderBtn');
takeOrderBtn.addEventListener('click', () =>{
    // console.log("takeOrderBtn clicked", foodItems);
    takeOrder()
        .then((res)=>{
            // console.log("res", res);
            // console.log(res[0]);
            let h3 = document.getElementById('orderHeading');
            h3.innerText = "Your Generated Order is"
            let yourOrder = document.querySelector('.yourOrder');
            for (const i of res) {
                let div = document.createElement('div');
                div.className = "item";
                let img = document.createElement('img');
                img.src = i.img;
                div.appendChild(img);
                let span1 = document.createElement('span');
                let span2 = document.createElement('span');
                span1.innerText = `Name : ${i.name}`;
                span2.innerText = `Price : ${i.price}₹`;
                div.appendChild(span1);
                div.appendChild(span2);

                yourOrder.appendChild(div);
            }
            orderPrep()
                .then((data)=>{
                    console.log("data ",data);
                    return payOrder(data);
                })
                .then((data1) => {
                    console.log("data1 ",data1);
                    thankyouFnc(data1);
                })
        })
});


async function takeOrder(){
    let order = [];
    let promise = new Promise((resolve,reject) => {
        setTimeout(() => {
            let totalItems = foodItems.length;
            let item1 = {};

            let index1 = Math.floor(Math.random()*totalItems);
            let index2 = Math.floor(Math.random()*totalItems);
            let index3 = Math.floor(Math.random()*totalItems);
            // console.log(index1,index2,index3);

            item1.name = foodItems[index1].name;
            item1.price = foodItems[index1].price;
            item1.img = foodItems[index1].img;

            order.push(item1);

            let item2 = {};
            item2.name = foodItems[index2].name;
            item2.price = foodItems[index2].price;
            item2.img = foodItems[index2].img;
            order.push(item2);

            let item3 = {};
            item3.name = foodItems[index3].name;
            item3.price = foodItems[index3].price;
            item3.img = foodItems[index3].img;
            order.push(item3);

            // console.log(order);

            resolve(order);
        }, 2500);
    })

    return promise;
    // console.log("order ",order);
}

function orderPrep(){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            let orderStatus = {order_status:true, paid:false};
            resolve(orderStatus);
        }, 1500);
    })
}

function payOrder(data){
    return new Promise((resolve,reject) => {
        setTimeout(() => {
            data.paid = true;
            resolve(data);
        }, 1000);
    })
}

function thankyouFnc(data){
    if(data.paid){
        alert("Thank you for visit !!");
    }
}
