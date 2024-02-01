const express = require('express')
const auth = require('./authRoute')
const user = require('./userRoute')
const router = express.Router()

router.get('/api/v1/', (_req, res) => {
    res.json({
        "message": "Hello World"
    })
})

router.use(auth)
router.use(user)
// other route
module.exports = router;