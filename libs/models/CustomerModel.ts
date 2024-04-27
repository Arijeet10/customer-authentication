import mongoose,{Schema,Document} from  "mongoose";

//set interface for mongoDB model fields
export interface Customer extends Document{
    firstname:string;
    lastname:string;
    password:string;
    contact:string;
    email:string;
    verifyCode:string;
    isVerified:boolean;
}

//set schema for mongoDB model
const CustomerSchema:Schema<Customer>=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    contact:{
        type:String,
        default:"",
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    verifyCode:{
        type:String,
        required:true,
    },
    isVerified:{
        type:Boolean,
        default:false,
    }
})

//create a mongoDB model
const CustomerModel=mongoose.models.customer||mongoose.model("customer",CustomerSchema);

export default CustomerModel;

