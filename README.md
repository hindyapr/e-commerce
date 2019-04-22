# e-commerce

## Routes Users
|Routes|HTTP Method|Request|Response|Description| 
|----|----|----|----|----|----|
|/users  |POST  |email: String,username: String,  password: String |Success: Register a user,<br /> Error: Internal server error |Register a user|
|/users/:id  |GET  |none |Success: Get user data by id, <br/>Error: Internal server error |Get user data by id|
|/users/login  |POST  |email: String , password: String |Success: Login as a user, <br/>Error: Internal server error |Login via email in Database|


## Routes Products
|Routes|HTTP Method|Request|Response|Description|
|----|----|----|----|----|----|
|/products/  |GET  |none |Success: Get all products,<br /> Error: Internal server error|Get all published products|
|/products  |POST  |token : String, <br />title: String,<br /> content: String ,<br /> published : Boolean,<br /> image: File |Success: Create a product,<br /> Error: Internal server error | Create a product|
|/products/:id  |PUT  |token : String, <br />title: String,<br /> content: String ,<br /> published : Boolean,<br /> image: File|Success: Update a product by id, <br />Error: Internal server error |Update a product by id|
|/products/:id  | DELETE  |token: String |Success: Delete a product by id,<br /> Error: Internal server error |Delete an article by id|

## Routes Charts
|Routes|HTTP Method|Request|Response|Description|
|----|----|----|----|----|----|
|/charts  |GET  |none |Success: Get all charts,<br /> Error: Internal server error|Get all published charts|
|/charts  |POST  |token : String, <br />title: String,<br /> content: String ,<br /> published : Boolean,<br /> image: File |Success: Create a product,<br /> Error: Internal server error | Create a product|
|/charts/:id  |PUT  |token : String, <br />title: String,<br /> content: String ,<br /> published : Boolean,<br /> image: File|Success: Update a product by id, <br />Error: Internal server error |Update a product by id|
|/charts/:id  | DELETE  |token: String |Success: Delete a product by id,<br /> Error: Internal server error |Delete an article by id|