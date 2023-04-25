let backendProducts = [];
//using fetch api async/await
const getProducts = async () => {
   //const let - block scoped variable
   const response = await fetch('http://localhost:8080/api/v1/products');
   const product = await response.json();

   // console.log(product.limit)
   //object destructuring
   const { data } = product;

   data.forEach((product) => {
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
      editButton.className = 'btn btn-secondary mb-2';
      editButton.innerText = 'Edit';
      editButton.setAttribute('data-bs-toggle', 'modal');
      editButton.setAttribute('data-bs-target', '#editStaticBackdrop');

      editButton.addEventListener('click', (event) => {
         event.preventDefault();
         //function call
         submitEditHandlerBackend(product);
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

};


//COnditional operator
// a ? console.log('true') : console.log('false');


//Function called when edit button is clicked
const submitEditHandler = (product) => {
   document.getElementById('editproductName').value = product.title;

}

//Function called when delete button is clicked
const submitDeleteHandler = async (product) => {
   const response = await fetch(`http://localhost:8080/api/v1/products/${product['_id']}`, {
      method: 'DELETE'
   });
   const deletedProd = await response.json();

   if (deletedProd.status) {
      window.location.reload();
   }
}

//This is the button click for add product from the modal.
const addProductHandler = async (event) => {
   event.preventDefault();
   const productName = document.getElementById('productName').value;
   const productDescription = document.getElementById('productDescription').value;
   const productImage = document.getElementById('productImage').value;

   let prod = {
      title: productName,
      description: productDescription,
      thumbnail: productImage
   }

   //Calling backend POST API for adding new product
   const response = await fetch('http://localhost:8080/api/v1/products', {
      headers: {
         'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(prod)
   });

   const submittedData = await response.json();

   if (submittedData.status) {
      window.location.reload();
   }

}

//This is the button click to submit edited value
const submitEditHandlerBackend = (prod) => {
   document.getElementById('editProductId').value = prod._id;
   document.getElementById('editProductName').value = prod.title;
   document.getElementById('editProductDescription').value = prod.description;
   document.getElementById('editProductImage').value = prod.thumbnail;
}


//Clicking from modal - Edit product which triggers backend
async function handleEdit(event) {
   let title = document.getElementById('editProductName').value;
   let description = document.getElementById('editProductDescription').value;
   let thumbnail = document.getElementById('editProductImage').value;

   let obj = {
      title,
      description,
      thumbnail
   }

   let prodId = document.getElementById('editProductId').value;

   const response = await fetch(`http://localhost:8080/api/v1/products/${prodId}`, {
      headers: {
         'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: JSON.stringify(obj)
   });

   const data = await response.json()

   if (data.status) {
      window.location.reload()
   }
}

getProducts();


