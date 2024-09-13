import express from 'express'
import {fetchItems,getItem, insertItem, deleteItem, updateItem,addToOrders,getUserOrders} from '../controller/viewItemsController.js'
import { verifyAToken } from '../middleware/authMiddleware.js'
// import { addToOrdersDB } from '../model/itemsDB.js'

const router = express.Router()


router.get('/orders',verifyAToken, getUserOrders); 
router.post('/orders',verifyAToken, addToOrders)

router.get('/',verifyAToken, fetchItems)
router.get('/:id',getItem)
router.post('/insert',insertItem)
router.delete('/:id', deleteItem)
router.patch('/:id', updateItem)


export default router