const express = require('express');
const router  = express.Router();

router.get('/', (req,res)=>{
    obj = {
        b : 'khushi',
        number : 09
    }
    res.json(obj);
})

module.exports = router;