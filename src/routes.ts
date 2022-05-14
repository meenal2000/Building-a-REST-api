import {Express , Response , Request} from "express";
import { createUserSessionHandler, deleteSessionHandler } from "./controller/session.controller";
import { createUserHandler } from "./controller/user.controller";
import validateResource from "./middleware/validateResource";
import {createUserSchema } from './schema/user.schema';
import {createSessionSchema} from './schema/session.schema';
import {getUserSessionsHandler} from './controller/session.controller';
import requireUser from "./middleware/requireUser";
import { createProductHandler, deleteProductHandler, getProductHandler, updateProductHandler } from "./controller/product.controller";
import { createProductSchema, getProductSchema , deleteProductSchema } from "./schema/product.schema";


function routes(app : Express){
    app.get('/healthcheck' , (req:Request , res:Response)=>{
        res.sendStatus(200);
    })
    // to get all the current users 
    app.post('/api/users' , validateResource(createUserSchema) , createUserHandler);
    // to get the session of the current user
    app.post('/api/sessions' , validateResource(createSessionSchema) , createUserSessionHandler);
    // to get all the active sessions 
    app.get('/api/sessions',requireUser, getUserSessionsHandler)
    // to delete a session
    app.delete('/api/sessions' ,requireUser , deleteSessionHandler)
    // get all the products
    app.post('/api/products',
    [requireUser , validateResource(createProductSchema)],
    createProductHandler);
    app.put(
        '/api/products/:productId',
        [requireUser , validateResource(createProductSchema)],
        updateProductHandler
    )
    app.get(
        '/api/products/:productId',
        validateResource(getProductSchema),
        getProductHandler
    )
    app.delete(
        '/api/products/:productId',
        [requireUser , validateResource(deleteProductSchema)],
        deleteProductHandler
    )
}

export default routes