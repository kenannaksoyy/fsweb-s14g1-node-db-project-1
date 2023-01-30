
const yup = require("yup");
const accountsModel = require("./accounts-model");

const accountSchema = yup.object().shape({
  name:yup
  .string().required("name and budget are required")
  .min(3,"name of account must be between 3 and 100").max(100,"name of account must be between 3 and 100"),
  budget:yup
  .number("budget of account must be a number").required("name and budget are required")
  .min(0,"budget of account is too large or too small").max(1000000,"budget of account is too large or too small")
});

exports.checkAccountPayload = async(req, res, next) => {
  // KODLAR BURAYA
  // Not: Validasyon için Yup(şu an yüklü değil!) kullanabilirsiniz veya kendiniz manuel yazabilirsiniz.
  try{

    if(req.body.name === undefined || req.body.budget === undefined){
      res.status(400).json({
        message:"name and budget are required"
      })
    }
    else{
      const account = {}; 
      account.name = await req.body.name.trim();
      account.budget = req.body.budget;
      
      if(!parseInt(account.budget)){
        res.status(400).json({
          message:"budget of account must be a number"
        })
      }
      else{
        await accountSchema.validate(account);
        req.Account_=account;
        next();
      }
      
    }
    
  }

  catch(err){
    res.status(400).json({
      message:err.message
    })
  }
  
}

exports.checkAccountNameUnique = async(req, res, next) => {
  const accounts = await accountsModel.getAll();
  let check = false;
  accounts.forEach(ac => {
    if(ac["name"] == req.Account_["name"]){
      check=true
    }
  });
  if(check){
    res.status(400).json({
      message:"that name is taken"
    })
  }
  else{
    next();
  }
}

exports.checkAccountId = async(req, res, next) => {
  // KODLAR BURAYA
  try{
    const account = await accountsModel.getById(req.params.id);
    if(!account){
        res.status(404).json({
            message: "account not found"
        })
    }
    else{
        req.account=account
    }
    next();
}
catch(err){
    res.status(500).json({
        message: "Bir sorun oluştu"
    })
}
}
