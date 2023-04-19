let backendProducts = [];
//using fetch api async/await
const getProducts = async () => {
   //const let - block scoped variable
   const response = await fetch('http://localhost:8080/api/v1/products');
   const product = await response.json();

   // console.log(product.limit)
   //object destructuring
   const { data } = product;

   localStorage.setItem("products", JSON.stringify(data))

};

const editHandler = (prd) => {
   console.log(prd)

}


getProducts();



if (localStorage.getItem("products") !== null) {

   //getting item from local storage
   backendProducts = localStorage.getItem("products");
   const products = JSON.parse(backendProducts);

   // console.log(products)
   products.forEach((product) => {
      // console.log(product)
      const div = document.createElement("div");
      div.style = "width: 23%"
      div.className = "card m-2";

      const image = document.createElement("img");
      image.className = 'h-75'
      image.src = product.thumbnail;

      const p = document.createElement("p");
      p.className = "text-center";
      p.innerText = product.title;

      div.append(image);
      div.append(p);

      //append divs in container to html
      const container = document.getElementById("container");
      container.append(div);

   })


} else {
   console.log('No data found')
}

