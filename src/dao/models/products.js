import mongoose from "mongoose"

const productsCollection = 'products'

const productsSchema = new mongoose.Schema({
  title: {type:String, required:true},
  description: {type:String, required:true},
  price: {type:Number, required:true},
  thumbnail: String,
  code: {type:String, unique:true},
  stock: {type:Number, required:true},
  category: {type:String, required:true},
  status: {type:Boolean, default: true},
})

productsSchema.set('toJSON',{
  transform: function(doc,ret){
    delete ret.__v;
    return ret;
  }
})

const productsModel = mongoose.model(productsCollection, productsSchema)

export default productsModel