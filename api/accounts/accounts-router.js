const router = require('express').Router();
const { checkAccountId, checkAccountPayload, checkAccountNameUnique } = require('./accounts-middleware');
const accountsModel = require("./accounts-model");

router.get('/', async(req, res, next) => {
  try{
    const accounts = await accountsModel.getAll();
    res.status(200).json(accounts);
  }
  catch(err){
    next(err);
  }
});

router.get('/:id',checkAccountId, async(req, res, next) => {
  try{
    res.status(201).json(req.account);
  }
  catch(err){
    next(err);
  }
})

router.post('/',checkAccountPayload,checkAccountNameUnique, async(req, res, next) => {
  try{
    const newAccount = await accountsModel.create(req.Account_);
    res.status(201).json(newAccount);
  }
  catch(err){
    next(err);
  }
})

router.put('/:id',checkAccountId,checkAccountPayload,checkAccountNameUnique, async(req, res, next) => {
  // KODLAR BURAYA
  try{
    const upAccount = await accountsModel.updateById(req.params.id, req.Account_);
    res.status(200).json(upAccount);
  }
  catch(err){
    next(err);
  }
});

router.delete('/:id',checkAccountId, async(req, res, next) => {
  // KODLAR BURAYA
  try{
    const deletedAccount = await accountsModel.getById(req.params.id);
    await accountsModel.deleteById(req.params.id);
    res.status(200).json(deletedAccount);
  }
  catch(err){
    next(err);
  }

});

router.use((err, req, res, next) => { // eslint-disable-line
  // KODLAR BURAYA
  res.status(err.status || 500).json({
    customMessage: "Malesef olmadı",
    message: err.message
  });
});


module.exports = router;
