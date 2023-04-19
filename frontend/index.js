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
   console.log(prd);

}

const submitEditHandler = (product) => {
   console.log(product.thumbnail);
}

const submitDeleteHandler = (product) => {
   console.log(product.id);
}


getProducts();



if (localStorage.getItem("products") !== null) {

   //getting item from local storage
   backendProducts = localStorage.getItem("products");
   const products = JSON.parse(backendProducts);

   // console.log(products)
   products.forEach((product) => {
      const div = document.createElement("div");
      div.style = "width: 23%"
      div.className = "card m-2";

      const image = document.createElement("img");
      image.className = 'h-75'
      image.src = product.thumbnail;

      const p = document.createElement("p");
      p.className = "text-center";
      p.innerText = product.title;

      const editButton = document.createElement('button');
      editButton.className = 'btn btn-primary mb-2';
      editButton.innerText = 'Edit';
      editButton.addEventListener('click', (event) => {
         event.preventDefault();
         //function call
         submitEditHandler(product);
      })

      const deleteButton = document.createElement('button');
      deleteButton.className = 'btn btn-danger';
      deleteButton.innerText = 'Delete';
      deleteButton.addEventListener('click', (event) => {
         event.preventDefault();
         //function call
         submitDeleteHandler(product);

      })

      div.append(image);
      div.append(p);
      div.append(editButton);
      div.append(deleteButton);

      //append divs in container to html
      const container = document.getElementById("container");
      container.append(div);

   })


} else {
   document.getElementById('container').innerHTML = 'No data found';
}

